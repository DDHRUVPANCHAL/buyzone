import React, { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Container, Row, Col, Button, Card } from 'react-bootstrap'
import axios from 'axios';

function Productbycategory() {

  let category = useLocation().pathname.split("/")[2]
  // console.log(category);

  let [categorydata, setCategorydata] = useState([]);
  let [loader, setLoader] = useState(true);

  async function Category_data() {
    try {
      await axios.get(`https://dummyjson.com/products/category/${category}`).then((response) => {
        console.log(response.data);
        setCategorydata(response.data.products)
      })
    } catch (e) {
      console.log(e);
    } finally {
      setLoader(false);
    }
  }

  useEffect(() => {
    Category_data();
  }, [category])

  if (loader) {
    return (
      <>
        <div style={{ backgroundColor: "black", height: "100vh", color: "white", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <h1>Please Wait...</h1>
        </div>
      </>
    )
  }

  return (
    <div>
      <Container>
        <h1 className='my-3 text-center' style={{ textTransform: "uppercase" }}>{category}</h1>
        <Row>
          {categorydata.map((value, index) => {
            return (
              <React.Fragment key={index}>
                <Col xs={12} sm={6} lg={4} xl={3}>
                  <Card className='my-3' style={{ backgroundColor: "var(--primary)", color: "var(--quaternary)" }}>
                    <Card.Img variant="top" src={value.images[0]} />
                    <Card.Body>
                      <Card.Title>{index + 1}. {value.title}</Card.Title>
                      <Card.Text>
                        {/* {value.description} */}
                      </Card.Text>
                      <Link to={`/productdetails/${value.id}`}>
                        <Button variant="primary">Learn More</Button>
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              </React.Fragment>
            )
          })}
        </Row>
      </Container>
    </div>
  )
}

export default Productbycategory
