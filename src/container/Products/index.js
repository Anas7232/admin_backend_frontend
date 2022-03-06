import React, { useEffect, useState } from 'react'
import { Container,Row, Col, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addproducts, getAllCategories, initialData } from '../../action'
import Layout from '../../components/Layout'
import Input from '../../components/UI/Input'
import NewModal from '../../components/UI/Modal'

const Products = (props) => {

    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const category = useSelector(state => state.category);
    const product = useSelector(state => state.product);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [productPicture, setProductPicture] = useState([]);
    const [description, setDescription] = useState('');
    const [categoryName, setCategoryName] = useState('');

    useEffect(() => {
        dispatch(getAllCategories(), initialData())
    }, [])

    const handleClose = () => {

        const form = new FormData();

        form.append('name', name);
        form.append('price', price);
        form.append('quantity', quantity);
        form.append('description', description);
        form.append('category', categoryName);

        for(let pic of productPicture){
            form.append('productPicture', pic)
        }
        dispatch(addproducts(form))
        

        setShow(false);
    }
    const handleShow = () => setShow(true);

    const optionalCategries = (categories, options = []) => {
        for(let category of categories){
            options.push({ _id: category._id, name: category.name, parentId: category.parentId });
            if(category.children.length > 0){
                optionalCategries(category.children, options)
            }
        }
        return options;
    }

    const handleProductPicture = (e) => {
        setProductPicture([
            ...productPicture,
            e.target.files[0]
        ])
    }


    return (
        <>
          <Layout sidebar>
            <Container>
            <Row>
                    <Col md={12}>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <h1> Products </h1>
                            <button onClick={handleShow}> Add </button>
                        </div>
                    </Col>
                </Row>
            </Container>

            <NewModal
            show={show}
            handleClose={handleClose}
            modalTitle={'Add New Products'}
            >

                <Input 
                placeholder={`Product Name`}
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
                <Input 
                placeholder={`Price`}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                />
                <Input 
                placeholder={`Quantity`}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                />
                <Input 
                placeholder={`Description`}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                />

                <select className="form-control" value={categoryName} onChange={(e) => setCategoryName(e.target.value)}>
                   <option> Choose Categories.... </option>
                   {
                       optionalCategries(category.categories).map(option => 
                        <option key={option._id} value={option._id}> {option.name} </option>
                        )
                   }
                </select>

                {
                    productPicture.length > 0 ?
                    productPicture.map((pic, index) => 
                    <div key={index}> {pic.name} </div>
                    ): null
                }

                <Input type="file" name="productPicture" onChange={handleProductPicture} />



            </NewModal>

            <Row style={{marginTop: '30px'}}>
                <Col md={12}>
                <Table striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>Product Name</th>
      <th>Price</th>
      <th>Quantity</th>
      <th>Description</th>
      <th>Category</th>
    </tr>
  </thead>
  <tbody>
   {
       product.products.length > 0 ?
       product.products.map(product =>
        <tr>
      <td> {product.name} </td>
      <td> {product.price} </td>
      <td> {product.quantity} </td>
      <td> {product.description} </td>
      <td> {product.category.name} </td>
    </tr>
        ): null
   }
  </tbody>
</Table>
                </Col>
            </Row>

            </Layout>  
        </>
    )
}

export default Products
