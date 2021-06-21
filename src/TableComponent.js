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
  const [users, dispatch] = useReducer(reducer, []);
  const [total, setTotalUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  //id's of multiple checked box
  const [allId, setAllId] = useState([]);
  const [checkAll, setCheckAll] = useState(false);
  const ITEMS_PER_PAGE = 10;
  const userPerPage = useMemo(() => {
    let allUsers = users;
    setTotalUsers(allUsers.length);
    if (search) {
      allUsers = allUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase()) ||
          user.role.toLowerCase().includes(search.toLowerCase())
      );
      setTotalUsers(allUsers.length);
    }

    return allUsers.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [users, currentPage, search]);

  if (users.length > 0 && userPerPage.length === 0 && currentPage > 1)
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
        {users.length > 0 ? (
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
          <Table responsive hover>
            <Header
              setCheck={checkAll}
              checkAll={(cond) => {
                setCheckAll(cond);
              }}
            />
            {userPerPage.length > 0 ? (
              <tbody>
                {
                  <>
                    {userPerPage.map((user) => {
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
            ) : users.length === 0 ? (
              <h1>NO USERS</h1>
            ) : total === 0 ? (
              <h1>NO RESULTS FOR '{search}'</h1>
            ) : null}
          </Table>
        </Row>
        <Row className="row justify-content-md-center">
          <Col sm={12} md={5}>
            {users.length > 0 && total > 0 ? (
              <Button
                variant="danger"
                onClick={() => {
                  checkAll
                    ? dispatch({ type: "delete_all", filterArray: userPerPage })
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
            {users.length > 0 && total > 0 ? (
              <PaginationComponent
                total={total}
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
