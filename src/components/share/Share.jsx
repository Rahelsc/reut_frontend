import "./share.css";
import { PermMedia, Label, Room, EmojiEmotions } from "@material-ui/icons";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import { Chip, CircularProgress } from "@material-ui/core";
import { FeedContext } from "../../feedContext/FeedContext";

const Share = () => {
  const { user } = useContext(AuthContext);
  // each time we submit a post the postRefresh is set. causing the rerendering of the feed component (by use of context)
  const { setPostBeforeRefresh } = useContext(FeedContext);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef(user.desc);
  const [file, setFile] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    let newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    if (file) {
      // Create the file metadata
      /** @type {any} */
      const metadata = {
        contentType: "image/jpeg",
      };

      // Upload file and metadata to the object 'images/mountains.jpg'
      const storageRef = ref(storage, "images/" + file.name);
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);

      // Listen for state changes, errors, and completion of the upload.
      await uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUpload(progress);
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              console.log("unKnown error");
              break;
          }
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/unauthorized":
              console.log("User doesn't have permission to access the object");
              break;
            case "storage/canceled":
              console.log("User canceled the upload");
              break;
            case "storage/unknown":
            default:
              console.log(
                "Unknown error occurred, inspect error.serverResponse"
              );
              break;
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log("File available at", downloadURL);
            newPost = { ...newPost, img: downloadURL };
            await axios.post("/posts", newPost);
            desc.current.value = "";
            setFile(null);
            setImageUpload(null);
          });
        }
      );
    }

    if (!file) {
      try {
        await axios.post("/posts", newPost);
        desc.current.value = "";
      } catch (error) {}
    }

    setPostBeforeRefresh("");
  };

  return (
    <div className="shareContainer">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/man.png"
            }
            alt=""
          />
          <input
            placeholder={`what's on your mind, ${user.username}?`}
            className="shareInput"
            type="text"
            ref={desc}
          />
        </div>

        {file ? (
          <div className="uploadImageContainer">
            <img
              className="uploadedImage"
              src={URL.createObjectURL(file)}
              alt=""
            />
            <Chip
              className="uploadedImageDeleteChip"
              label="remove"
              variant="outlined"
              onDelete={() => setFile(null)}
            />
          </div>
        ) : (
          ""
        )}
        <hr className="shareHr" />
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                type="file"
                id="file"
                accept=".png, .jpeg, .jpg"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />
            </label>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="gold" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          {imageUpload ? (
            <CircularProgress variant="determinate" value={imageUpload} />
          ) : (
            <button type="submit" className="shareButton">
              Share
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Share;
