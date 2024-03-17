const {mockerRequest, mockerResponse}=require('./mocker');
const categoryController=require('../../controllers/category.controller');
const categoryService=require('../../services/category.service');

const categoryPayload={
    id:1,
    name:"test category",
    description:"This is a test category",
    update:jest.fn()
};

const productPayload={
    id:1,
    name:"test product",
    description:"This is a test product category",
    cost:1000
};


test('category controller should create a category',async()=>{
    const spy=jest.spyOn(categoryService,"create").mockImplementation(()=>{
        return categoryPayload;
    })

    const req=mockerRequest();
    const res=mockerResponse();
    const response=await categoryController.createCategory(req,res);

    expect(spy).toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith({
        message:'successfully created the category',
        success:true,
        data:categoryPayload,
        err:{}
    })
})

test('category controller should not create a category',async()=>{
    

    const req=mockerRequest();
    const res=mockerResponse();
    const spy=jest.spyOn(categoryService,"create").mockImplementation(()=>{
        return undefined;
    })
    const response=await categoryController.createCategory(req,res);

    expect(spy).toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({
        message:'something went wrong',
        success:false,
        data:{},
        err:'not able to do operation category'
    })
})

test('this Category controller return category by name', async()=>{
    const req=mockerRequest()
    // req.query.name="test category"
    const res=mockerResponse()

    const spy=jest.spyOn(categoryService,"getByName").mockImplementation(()=>{
        return categoryPayload;
    })
    const response=await categoryController.getAllCategories(req,res)
    expect(spy).toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
        message:'successfully fetched all the categories',
        success:true,
        data:categoryPayload,
        err:{}
    })

})

test('this Category controller return all categories', async()=>{
    const req=mockerRequest()
    req.query={}
    const res=mockerResponse()
    const spy = jest.spyOn(categoryService, 'getAll').mockImplementation(()=>{
        return [categoryPayload];
    })
   
    const response=await categoryController.getAllCategories(req,res)
    expect(spy).toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
        message:'successfully fetched all the categories',
        success:true,
        data:[categoryPayload],
        err:{}
    })
})


test('category controller should not return all category',async()=>{
    const req=mockerRequest();
    req.query={}
    const res=mockerResponse();
    const spy=jest.spyOn(categoryService,"getAll").mockImplementation(()=>{
        return;
    })
    console.log(req.query,'req.query')
    const response=await categoryController.getAllCategories(req,res);
    expect(spy).toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({
        message:'Not albe to find the categories',
            success:true,
            data:{},
            err:'category not present'
    })
})


test('this category controller should return category by id',async()=>{
    const req=mockerRequest()
    const res=mockerResponse()

    const spy=jest.spyOn(categoryService, 'getById').mockImplementation(()=>{
        return categoryPayload
    })

    const response=await categoryController.getCategoryById(req,res)
    expect(spy).toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
        message:'successfully fetched the category',
        success:true,
        data:categoryPayload,
        err:{}
    })
})


test('this category controller should not return category by id',async()=>{
    const req=mockerRequest()
    const res=mockerResponse()

    const spy=jest.spyOn(categoryService, 'getById').mockImplementation(()=>{
        return undefined
    })

    const response=await categoryController.getCategoryById(req,res)
    expect(spy).toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({
        message:'something went wrong',
        success:false,
        data:{},
        err:'not able to do operation category'
    })
})


test('This category controller should update the category',async()=>{
    const req=mockerRequest()
    const res=mockerResponse()

    const spy=jest.spyOn(categoryService,'update').mockImplementation(()=>{
        return categoryPayload
    })

    const response=await categoryController.updateCategory(req,res);

    expect(spy).toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
        message:'successfully updated the category',
        success:true,
        data:categoryPayload,
        err:{}
    })
})

test('This category controller should not update the category',async()=>{
    const req=mockerRequest()
    const res=mockerResponse()

    const spy=jest.spyOn(categoryService,'update').mockImplementation(()=>{
        return {};
    })

    const response=await categoryController.updateCategory(req,res);

    expect(spy).toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({
        message:'Not able to find the category',
        success:false,
        data:{},
        err:'not able to do operation category'
    })
})

test('This category controller should not update the category by server error',async()=>{
    const req=mockerRequest()
    const res=mockerResponse()

    const spy=jest.spyOn(categoryService,'update').mockImplementation(()=>{
        return undefined;
    })

    const response=await categoryController.updateCategory(req,res);

    expect(spy).toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({
        message:'something went wrong',
        success:false,
        data:{},
        err:'not able to do operation category'
    })
})


test('this category controller should delete the category',async()=>{
    const req=mockerRequest();
    const res = mockerResponse();

    const spy = jest.spyOn(categoryService,"destroy").mockImplementation(()=>{
        return true;
    })

    const response=await categoryController.DeleteCategory(req,res)

    expect (spy).toHaveBeenCalled();
    expect (res.status).toHaveBeenCalledWith(200);
    expect (res.json).toHaveBeenCalledWith({
        message:'Successfully deleted the category',
        success:true,
        data:{},
        err:{}
    })
})


test('this category controller should not delete the category',async()=>{
    const req=mockerRequest();
    
    const res = mockerResponse();

    const spy = jest.spyOn(categoryService,"destroy").mockImplementation(()=>{
        return undefined;
    })

    const response=await categoryController.DeleteCategory(req,res)

    expect (spy).toHaveBeenCalled();
    expect (res.status).toHaveBeenCalledWith(500);
    expect (res.json).toHaveBeenCalledWith({
        message:'something went wrong',
        success:false,
        data:{},
        err:'not able to do operation category'
    })
})


test('This category controller should return products by category',async()=>{
    const req=mockerRequest();
    const res=mockerResponse();

    const spy=jest.spyOn(categoryService, 'getProducts').mockImplementation(()=>{
        return productPayload
    })

    const response=await categoryController.getProductsByCategory(req,res)

    expect(spy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
        message:'Successfully fetched the products of the category',
        success:true,
        data:productPayload,
        err:{}
    })
})

test('This category controller should not return products by category',async()=>{
    const req=mockerRequest();
    const res=mockerResponse();

    const spy=jest.spyOn(categoryService, 'getProducts').mockImplementation(()=>{
        return undefined;
    })

    const response=await categoryController.getProductsByCategory(req,res)

    expect(spy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({
        message:'something went wrong',
        success:false,
        data:{},
        err:'not able to do operation category'
    })
})