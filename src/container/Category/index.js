import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addCateory, getAllCategories, updateCategories } from '../../action'
import Layout from '../../components/Layout'
import Input from '../../components/UI/Input'
import NewModal from '../../components/UI/Modal'
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import { IoIosArrowForward,IoIosArrowDown,IoIosCheckboxOutline,IoIosCheckbox } from "react-icons/io";

const Category = (props) => {

    const dispatch = useDispatch();
    const category = useSelector(state => state.category);
    const [show, setShow] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const [parentCategoryId, setparentCategoryId] = useState('');
    const [categoryImage, setCategoryImage] = useState('');
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
    const [checkedArray, setCheckedArray] = useState([]);
    const [expandedArray, setExpandedArray] = useState([]);

    const handleClose = () => {

        const form = new FormData();

        form.append('name', categoryName);
        form.append('parentId', parentCategoryId);
        form.append('categoryImage', categoryImage)
        dispatch(addCateory(form))
        

        setShow(false);
    }
    const handleShow = () => setShow(true);


    useEffect(() => {
        dispatch(getAllCategories())
    }, []);

    const renderAllCategories = (categories) => {
        let myCategories = [];
        for(let category of categories){
            myCategories.push(
                {
                    label: category.name,
                    value: category._id,
                    children: category.children.length > 0 && renderAllCategories(category.children)
                }
                // <li key={category._id}>
                //     {category.name}
                //     {category.children.length > 0 ? (<ul> {renderAllCategories(category.children)} </ul>) : null}
                // </li>
            )
        }
        return myCategories;
    }

    const optionalCategries = (categories, options = []) => {
        for(let category of categories){
            options.push({ _id: category._id, name: category.name, parentId: category.parentId, type: category.type });
            if(category.children.length > 0){
                optionalCategries(category.children, options)
            }
        }
        return options;
    }

    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0])
    }

    const updateCategory = () => {

        const categories = optionalCategries(category.categories);
        const checkedArray = [];
        const expandedArray = [];
        checked.length > 0 && checked.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId == category._id);
            category && checkedArray.push(category)
        });
        expanded.length > 0 && expanded.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId == category._id);
            category && expandedArray.push(category);
        });
        setCheckedArray(checkedArray);
        setExpandedArray(expandedArray)

        setUpdateCategoryModal(true);

        console.log({ checked, expanded, categories, checkedArray, expandedArray })
    }

    const handleCategoryInputs = (key, value, index, type) => {
        if(type == "checked"){
            const updateCehckdArray = checkedArray.map((item, _index) => index == _index ? { ...item, [key]:value } : item);
            setCheckedArray(updateCehckdArray);
        }else if(type == "expanded"){
            const updateExpandeddArray = expandedArray.map((item, _index) => index == _index ? { ...item, [key]:value } : item);
            setExpandedArray(updateExpandeddArray);
        }
    }

    const handleUpdateCategorForm = () => {

        const form = new FormData();

        expandedArray.forEach((item, index) => {
            form.append('_id', item._id);
            form.append('name', item.name);
            form.append('parentId', item.parentId ? item.parentId : '');
            form.append('type', item.type)
        });
        checkedArray.forEach((item, index) => {
            form.append('_id', item._id);
            form.append('name', item.name);
            form.append('parentId', item.parentId ? item.parentId : '');
            form.append('type', item.type)
        });
        dispatch(updateCategories(form));

        setUpdateCategoryModal(false);
    }

    return (
        <>
          <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <h1> Category </h1>
                            <button onClick={handleShow}> Add </button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                    <CheckboxTree
                        nodes={renderAllCategories(category.categories)}
                        checked={checked}
                        expanded={expanded}
                        onCheck={checked => setChecked( checked )}
                        onExpand={expanded => setExpanded( expanded )}
                        icons={{
                            check: <IoIosCheckbox />,
                            uncheck: <IoIosCheckboxOutline />,
                            halfCheck: <IoIosCheckboxOutline />,
                            expandClose: <IoIosArrowForward />,
                            expandOpen: <IoIosArrowDown />,
                        }}
                    />
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <button> Delete </button>
                        <button onClick={updateCategory}> Edit </button>
                    </Col>
                </Row>
            </Container>


           <NewModal
           show={show}
           handleClose={handleClose}
           modalTitle={'Add New Category'}
           >
               <Input 
               placeholder={`Category Name`}
               value={categoryName}
               onChange={(e) => setCategoryName(e.target.value)}
               />

               <select className="form-control" value={parentCategoryId} onChange={(e) => setparentCategoryId(e.target.value)}>
                   <option> Choose Categories.... </option>
                   {
                       optionalCategries(category.categories).map(option => 
                        <option key={option._id} value={option._id}> {option.name} </option>
                        )
                   }
               </select>

               <Input type="file" name="categoryImage" onChange={handleCategoryImage} />

           </NewModal>

           {/* Update Category Modal */}

           <NewModal
           show={updateCategoryModal}
           handleClose={handleUpdateCategorForm}
           modalTitle={'Add New Category'}
           size="lg"
           >

               {
                   expandedArray.length > 0 &&
                   expandedArray.map((item, index) => 
                   <Row>
                   <Col>
                   <Input 
                    placeholder={`Category Name`}
                    value={item.name}
                    onChange={(e) => handleCategoryInputs('name', e.target.value, index, 'expanded')}
                    />
                   </Col>
                   <Col>
                   <select className="form-control" value={item.parentId} onChange={(e) => handleCategoryInputs('parentId', e.target.value, index, 'expanded')}>
                   <option> Choose Categories.... </option>
                   {
                       optionalCategries(category.categories).map(option => 
                        <option key={option._id} value={option._id}> {option.name} </option>
                        )
                   }
                    </select>
                   </Col>
                   <Col>
                        <select className="form-control">
                            <option value=""> Choose Types </option>
                            <option value="store"> Store </option>
                            <option value="products"> Products </option>
                            <option value="page"> Page </option>
                        </select>
                   </Col>
               </Row>
                   )
               }

{
                   checkedArray.length > 0 &&
                   checkedArray.map((item, index) => 
                   <Row>
                   <Col>
                   <Input 
                    placeholder={`Category Name`}
                    value={item.name}
                    onChange={(e) => handleCategoryInputs('name', e.target.value, index, 'checked')}
                    />
                   </Col>
                   <Col>
                   <select className="form-control" value={item.parentId} onChange={(e) => handleCategoryInputs('parentId', e.target.value, index, 'checked')}>
                   <option> Choose Categories.... </option>
                   {
                       optionalCategries(category.categories).map(option => 
                        <option key={option._id} value={option._id}> {option.name} </option>
                        )
                   }
                    </select>
                   </Col>
                   <Col>
                        <select className="form-control">
                            <option value=""> Choose Types </option>
                            <option value="store"> Store </option>
                            <option value="products"> Products </option>
                            <option value="page"> Page </option>
                        </select>
                   </Col>
               </Row>
                   )
               }
              
               

              

           </NewModal>

          </Layout>  
        </>
    )
}

export default Category
