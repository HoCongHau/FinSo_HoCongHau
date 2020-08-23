import React, { useState, useEffect } from "react";
import {
  Tabs,
  Tab,
  CardColumns,
  Row,
  Form,
  Button,
  Col,
  Container,
} from "react-bootstrap";
import CardNews from "../card/CardNews";
import "./tab-custom.css";
import { checkLogin } from "../../containers/checkLogin";
import { getPreferenceUser } from "../../containers/getPreferenceUser";
import ModalNews from "../modal/ModalNews";
import { getTopHeadline } from "../../containers/getTopHeadline";
import { getPreferenceNews } from "../../containers/getPreferenceNews";
import LoadMore from "../load-more/LoadMore";

function TabCustom({ userName }) {
  const [key, setKey] = useState("top-headline");
  const [preference, setPreference] = useState("bitcoin");
  const [showDetail, setShowDetail] = useState(false);
  const [dataDetail, setDataDetail] = useState([]);
  const [countClick, setCountClick] = useState(1);

  // data of tabs
  const [topHeadline, setTopHeadline] = useState([]);
  const [totalTopHeadline, setTotalTopHeadline] = useState(0);
  const [preferencesNews, setPreferencesNews] = useState([]);
  const [totalPreferencesNews, setTotalPreferencesNews] = useState(0);

  // function update when submit change preferences
  const handleUpdate = (e) => {
    e.preventDefault();
    if (localStorage.getItem("dataFinSo")) {
      let dataFinSo = JSON.parse(localStorage.getItem("dataFinSo"));
      let indexUser = dataFinSo.findIndex(
        (obj) => obj.name === checkLogin() || userName
      );
      dataFinSo[indexUser].preferences = preference;
      localStorage.setItem("dataFinSo", JSON.stringify(dataFinSo));
      alert("Updated success!");
    }
  };

  useEffect(() => {
    switch (key) {
      case "profile": {
        break;
      }
      case "preferences": {
        getPreferenceNews(countClick).then((res) =>{
          setTotalPreferencesNews(res.total);
          setPreferencesNews(preferencesNews.concat(res.articles));
        });
        break;
      }
      default:
        getTopHeadline(countClick).then((res) => {
          setTotalTopHeadline(res.total);
          setTopHeadline(topHeadline.concat(res.articles));
        });
        break;
    }
  }, [key, countClick]);

  // reset active page (countClick) when change tab
  useEffect(()=>{
    setCountClick(1);
    setTopHeadline([]);
    setPreferencesNews([]);
  }, [key]);

  return (
    <>
      <ModalNews
        show={showDetail}
        handleClose={() => setShowDetail(false)}
        data={dataDetail}
      />
      <Tabs
        defaultActiveKey="home"
        id="uncontrolled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Tab eventKey="top-headline" title="Top headline">
          <div className="container mt-4 mb-4">
            <CardColumns>
              {topHeadline.map((item, key) => (
                <div
                  key={key}
                  onClick={() => {
                    setDataDetail(item);
                    setShowDetail(true);
                  }}
                >
                  <CardNews
                    src={item.urlToImage}
                    title={item.title}
                    description={item.description}
                  />
                </div>
              ))}
            </CardColumns>
            {/* show button Load more if total of top headline > size of list top headline current */}
            {totalTopHeadline > topHeadline.length ? <LoadMore
              loading={totalTopHeadline > topHeadline.length}
              onClick={() => {
                let click = countClick;
                setCountClick(++click);
              }}
            /> : ""}
          </div>
        </Tab>
        {checkLogin() || userName ? (
          <Tab eventKey="preferences" title="Preferences">
            <div className="container mt-4 mb-4">
              <Row>
                <h2>
                  Your preference:{" "}
                  <b style={{ textTransform: "capitalize" }}>
                    {getPreferenceUser(checkLogin() || userName)}
                  </b>
                </h2>
              </Row>
               <CardColumns>
                {preferencesNews.map((item, key) => (
                  <div
                    key={key}
                    onClick={() => {
                      setDataDetail(item);
                      setShowDetail(true);
                    }}
                  >
                    <CardNews
                      src={item.urlToImage}
                      title={item.title}
                      description={item.description}
                    />
                  </div>
                ))}
              </CardColumns>
              {/* show button Load more if total of top preferences > size of list top preferences current */}
              {totalPreferencesNews > preferencesNews.length ? <LoadMore
              loading={totalPreferencesNews > preferencesNews.length}
              onClick={() => {
                let click = countClick;
                setCountClick(++click);
              }}
            /> : ""}
            </div>
          </Tab>
        ) : (
          ""
        )}
        {checkLogin() || userName ? (
          <Tab eventKey="profile" title="Profile">
            <Container className="container mt-4 mb-4">
              <Row>
                <Col md={{ span: 6, offset: 3 }}>
                  <Form
                    onSubmit={(e) => {
                      handleUpdate(e);
                    }}
                  >
                    <Form.Group as={Row} controlId="formEditProfile">
                      <Form.Label column sm={3}>
                        Your name (*)
                      </Form.Label>
                      <Col sm={9}>
                        <Form.Control
                          readOnly
                          required
                          type="text"
                          value={checkLogin()}
                        />
                      </Col>
                    </Form.Group>
                    <fieldset>
                      <Form.Group as={Row}>
                        <Form.Label as="legend" column sm={3}>
                          Preferences
                        </Form.Label>
                        <Col sm={9}>
                          <Form.Check
                            defaultChecked={
                              getPreferenceUser(checkLogin() || userName) ===
                              "bitcoin"
                            }
                            type="radio"
                            label="Bitcoin"
                            name="preference"
                            id="bitcoinEdit"
                            value="bitcoin"
                            onChange={(e) => setPreference(e.target.value)}
                          />
                          <Form.Check
                            defaultChecked={
                              getPreferenceUser(checkLogin() || userName) ===
                              "apple"
                            }
                            type="radio"
                            label="Apple"
                            name="preference"
                            id="appleEdit"
                            value="apple"
                            onChange={(e) => setPreference(e.target.value)}
                          />
                          <Form.Check
                            defaultChecked={
                              getPreferenceUser(checkLogin() || userName) ===
                              "earthquake"
                            }
                            type="radio"
                            label="Earthquake"
                            name="preference"
                            id="earthquakeEdit"
                            value="earthquake"
                            onChange={(e) => setPreference(e.target.value)}
                          />
                          <Form.Check
                            defaultChecked={
                              getPreferenceUser(checkLogin() || userName) ===
                              "animals"
                            }
                            type="radio"
                            label="Animals"
                            name="preference"
                            id="animalsEdit"
                            value="animals"
                            onChange={(e) => setPreference(e.target.value)}
                          />
                        </Col>
                      </Form.Group>
                    </fieldset>
                    <Button variant="primary" type="submit">
                      Save
                    </Button>
                  </Form>
                </Col>
              </Row>
            </Container>
          </Tab>
        ) : (
          ""
        )}
      </Tabs>
    </>
  );
}

export default TabCustom;
