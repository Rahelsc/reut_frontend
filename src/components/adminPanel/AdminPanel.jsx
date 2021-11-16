import { useEffect, useMemo, useState } from "react";
import { axiosJWT } from "../../authFunctions";
import Table from "../../components/table/Table.jsx";
import './adminPanel.css'

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const data = useMemo(() => users, [users])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosJWT.get(`/users/allusers`, {
          headers: {
            authorization: "Bearer " + localStorage.getItem("jwtToken"),
          },
        });
        setUsers(res.data);
        console.log(users);
      } catch (error) {
        console.log("error in admin panel: ", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="containerForAdmin">
      <h1 className="greetingForAdmin">Hello dear Admin</h1>
      {users && <Table data={data} />}
    </div>
  );
};

export default AdminPanel;
