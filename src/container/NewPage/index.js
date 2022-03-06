import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import Input from '../../components/UI/Input';
import NewModal from '../../components/UI/Modal'
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from '../../action';
import { useBootstrapPrefix } from 'react-bootstrap/esm/ThemeProvider';

const Newpage = (props) => {

    const [show, setShow] = useState(false);
    const [createModal, setCreateModal] = useState(false);
    const [title, setTitle] = useState('');
    const category = useSelector(state => state.category);
    const [categoryId, setCategoryId] = useState('');
    const [desc, setDesc] = useState('');
    const [categories, setCategories] = useState([]);
    const [type, setType] = useState('');
    const [banners, setBanners] = useState('');
    const [products, setProducts] = useState('');

    // useEffect(() => {
    //     setCategories(linearCategories(category.categories))
    // }, [category])

    useEffect(() => {
        setCategories(getAllCategories(category.categories))
    }, [category])

    const handleBannerImage = (e) => {
        console.log(e)
        setBanners([...banners, e.target.files[0]])
    };

    const handleProductsImage = (e) => {
        console.log(e);
        setProducts([...products, e.target.files[0]])
    }

    const optionalCategries = (categories, options = []) => {
        for (let category of categories) {
            options.push({ _id: category._id, name: category.name, parentId: category.parentId, type: category.type });
            if (category.children.length > 0) {
                optionalCategries(category.children, options)
            }
        }
        return options;
    }

    const onCategoryChange = (e) => {
        const category = categories.find(category => category._id == e.target.value);
        setCategoryId(e.target.value);
        setType(category.type);
    }

    const submitPageForm = () => {
       

        if(title == ""){
            alert('Title is Required..!');
            setCreateModal(false);
            return;
        }

        const form = new FormData();
        form.append('title', title);
        form.append('description', desc);
        form.append('category', categoryId);
        form.append('type', type);
        banners.forEach((banner, index) => {
            form.append('banners', banner);
        });
        products.forEach((product, index) => {
            form.append('products', product);
        });

        console.log({ title, category, type, desc, banners, products })
    }

    const renderCreatePageModal = () => {
        return (
            <NewModal
                show={createModal}
                handleClose={submitPageForm}
                modalTitle={'Add New Page'}
            >

                <Row>
                    <Col>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder={'Page Title'}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>

                        <select className="form-control" value={categoryId} onChange={onCategoryChange}>
                            <option> Choose Categories.... </option>
                            {
                                optionalCategries(category.categories).map(option =>
                                    <option key={option._id} value={option._id}> {option.name} </option>
                                )
                            }
                        </select>

                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Input
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            placeholder={'Page Desc'}
                        />
                    </Col>
                </Row>

                {
                    banners.length > 0 ?
                        banners.map((banner, index) =>
                            <Row>
                                <Col> {banner.name} </Col>
                            </Row>
                        ) : null
                }

                <Row>
                    <Col>
                        <Input
                            type="file"
                            name="banners"
                            onChange={handleBannerImage}
                        />
                    </Col>
                </Row>

                {
                    products.length > 0 ?
                    products.map((product, index) => 
                    <Row key={index}>
                        <Col> {product.name} </Col>
                    </Row>
                    ) : null
                }
               
                <Row>
                    <Col>
                        <Input
                            type="file"
                            name="products"
                            onChange={handleProductsImage}
                        />
                    </Col>
                </Row>

            </NewModal>
        )
    }

    return (
        <>
            <Layout sidebar>
                {renderCreatePageModal()}
                <button onClick={() => setCreateModal(true)}> Create Page </button>
            </Layout>
        </>
    )
}

export default Newpage
