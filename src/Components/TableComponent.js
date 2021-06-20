import React from "react";
import axios from "axios";
import { Container, Button, Row, Col, Table } from "react-bootstrap";
import { useMemo, useState, useEffect, useReducer } from "react";
import User from "./User";
import Header from "./Header";
import PaginationComponent from "./PaginationComponent";
import { reducer } from "../Reducer/reducerFunction";
import "bootstrap/dist/css/bootstrap.min.css";
const BASE_URL =
  "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

function TableComponent() {
  useEffect(() => {
    axios.get(BASE_URL).then((res) => {
      dispatch({
        type: "get_data",
        payload: { users: res.data },
      });
    });
  }, []);
  // const clear = createContext();
  const [AllUsers, dispatch] = useReducer(reducer, []);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [allId, setAllId] = useState([]);
  const [checkAll, setCheckAll] = useState(false);
  const ITEMS_PER_PAGE = 10;
  const userData = useMemo(() => {
    let allUsers = AllUsers;
    setTotalItems(allUsers.length);
    if (search) {
      allUsers = allUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase()) ||
          user.role.toLowerCase().includes(search.toLowerCase())
      );
      setTotalItems(allUsers.length);
    }

    return allUsers.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [AllUsers, currentPage, search]);

  if (AllUsers.length > 0 && userData.length === 0 && currentPage > 1)
    setCurrentPage(currentPage - 1);
  const toggleCheckbox = (e, target) => {
    if (e) {
      setAllId([...allId, target]);
    } else {
      let items = allId.filter((item) => {
        return item !== target;
      });
      setAllId(items);
    }
  };
  function updateUser(updatedUser) {
    dispatch({ type: "update_user", filterArray: updatedUser });
  }

  return (
    <div>
      <h1 className="text-center">ADMIN TABLES</h1>
      <Container variant="secondary">
        {AllUsers.length > 0 ? (
          <Row className="row justify-content-md-center">
            <Col xs={12} md={5}>
              <input
                type="text"
                className="form-control"
                style={{ width: "240px" }}
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Col>
            <Col xs={6} md={4}>
              <Button
                onClick={() => {
                  setSearch("");
                }}
              >
                Clear Search
              </Button>
            </Col>
          </Row>
        ) : null}
        <Row className="row justify-content-md-center">
          {userData.length > 0 ? (
            <Table responsive hover>
              <Header
                setCheck={checkAll}
                checkAll={(cond) => {
                  setCheckAll(cond);
                }}
              />

              <tbody>
                {
                  <>
                    {userData.map((user) => {
                      return (
                        <User
                          key={user.id}
                          user={user}
                          setDeleteUser={(id) => {
                            dispatch({ type: "delete_one", id: id });
                            setSearch("");
                          }}
                          delMultiple={(e, id) => {
                            toggleCheckbox(e, id);
                          }}
                          isCheckedAll={checkAll}
                          updateUser={updateUser}
                        />
                      );
                    })}
                  </>
                }
              </tbody>
            </Table>
          ) : AllUsers.length === 0 ? (
            <h1>NO USERSs</h1>
          ) : totalItems === 0 ? (
            <h1>NO RESULTS FOR '{search}'</h1>
          ) : (
            <h1>Loading</h1>
          )}
        </Row>
        <Row className="row justify-content-md-center">
          <Col sm={12} md={5}>
            {AllUsers.length > 0 && totalItems > 0 ? (
              <Button
                variant="danger"
                onClick={() => {
                  checkAll
                    ? dispatch({ type: "delete_all", filterArray: userData })
                    : dispatch({ type: "delete_multiple", filterArray: allId });
                  setCheckAll(false);
                  setSearch("");
                }}
              >
                Delete Selected
              </Button>
            ) : null}
          </Col>
          <Col>
            {AllUsers.length > 0 && totalItems > 0 ? (
              <PaginationComponent
                total={totalItems}
                itemsPerPage={ITEMS_PER_PAGE}
                currentPage={currentPage}
                onPageChange={(page) => setCurrentPage(page)}
              />
            ) : null}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default TableComponent;
