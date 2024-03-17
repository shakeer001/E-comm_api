const {category}=require('../../models/index');
const categoryService=require('../../services/category.service')


const categoryPayload={
    id:1,
    name:"test category",
    description:"This is a test category",
    update:jest.fn(),
    destroy:jest.fn()
};


test('The category service should create a category',async()=>{
    const spy=jest.spyOn(category,'create').mockImplementation(()=>{
        return categoryPayload;
    });
    const response=await categoryService.create(categoryPayload);
    expect(spy).toHaveBeenCalled()
    expect(response).toBe(categoryPayload)
})

test('The category service should not create a category',async()=>{
    const spy=jest.spyOn(category,'create').mockImplementation(()=>{
        return undefined;
    });
    const response=await categoryService.create(categoryPayload);
    expect(spy).toHaveBeenCalled()
    expect(response).toBe(undefined)
})



test('the category service should return all category',async()=>{
    const spy=jest.spyOn(category,"findAll").mockImplementation(()=>{
        return [categoryPayload]
    })
    const response=await categoryService.getAll()
    expect(spy).toHaveBeenCalled()
    expect(response).toContain(categoryPayload)
})

test('the category service should not return all category',async()=>{
    const spy=jest.spyOn(category,"findAll").mockImplementation(()=>{
        return undefined
    })
    const response=await categoryService.getAll()
    expect(spy).toHaveBeenCalled()
    expect(response).toBe(undefined)
})



test('this category service should return category by id',async()=>{
    const spy=jest.spyOn(category, "findByPk").mockImplementation(()=>{
        return categoryPayload
    })
    const response=await categoryService.getById(1)
    expect(spy).toHaveBeenCalled()
    expect(response).toEqual(categoryPayload)
})

test('this category service should not return category by id',async()=>{
    const spy=jest.spyOn(category, "findByPk").mockImplementation(()=>{
        return undefined
    })
    const response=await categoryService.getById(1)
    expect(spy).toHaveBeenCalled()
    expect(response).toEqual()
})

test('this category service should return category by name',async()=>{
    const spy=jest.spyOn(category, "findOne").mockImplementation(()=>{
        return categoryPayload
    })
    const response=await categoryService.getByName({name:"test category"})
    expect(spy).toHaveBeenCalled()
    expect(response).toEqual(categoryPayload)
})

test('this category service should not return category by name',async()=>{
    const spy=jest.spyOn(category, "findOne").mockImplementation(()=>{
        return undefined
    })
    const response=await categoryService.getByName({name:"test category"})
    expect(spy).toHaveBeenCalled()
    expect(response).toEqual(undefined)
})


test('this category service should update the category',async()=>{
    const spy1=jest.spyOn(category,"findByPk").mockImplementation(()=>{
        return categoryPayload;
    })
    const spy2=jest.spyOn(categoryPayload,"update").mockImplementation(()=>{
        return;
    })
    const response=await categoryService.update({description:'new description'},1)
    expect(spy1).toHaveBeenCalled()
    expect(spy2).toHaveBeenCalled()
    expect(response).toBe(categoryPayload)
})


test('this category service should not update the category', async()=>{
    const spy=jest.spyOn(category,"findByPk").mockImplementation(()=>{
        return undefined;
    })
    const response=await categoryService.update({description:'new description'},1)
    expect(spy).toHaveBeenCalled();
    expect(response).toEqual({})
})


test('This category service should destroy the category',async()=>{
    const spy1=jest.spyOn(category,'findByPk').mockImplementation(()=>{
        return categoryPayload;
    })
    const spy2=jest.spyOn(categoryPayload,'destroy').mockImplementation(()=>{
        return ;
    })
    const response =await categoryService.destroy({id:1})
    expect(spy1).toHaveBeenCalled()
    expect(spy2).toHaveBeenCalled()
    expect(response).toBe(true)
})

test('This category service should not destroy the category',async()=>{
    const spy1=jest.spyOn(category,'findByPk').mockImplementation(()=>{
        return undefined;
    })
    // const spy2=jest.spyOn(categoryPayload,'destroy').mockImplementation(()=>{
    //     return categoryPayload
    // })
    const response =await categoryService.destroy({id:1})
    expect(spy1).toHaveBeenCalled()
    expect(response).toBe(undefined)
})


test('this category service should return Product by category',async()=>{
    const spy=jest.spyOn(category,"findByPk").mockImplementation(()=>{
        return categoryPayload;
    })
    const response=await categoryService.update({description:'new description'},1)
    expect(spy).toHaveBeenCalled()
    expect(response).toBe(categoryPayload)
})