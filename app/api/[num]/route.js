import { queryExecute} from "../Db"

export async function DELETE(req, {params}){
    console.log(params);
    const get = await queryExecute(`delete from new_table where num=?`,[params.num])
    const getGet = await queryExecute(`select * from new_table`)
    return Response.json(getGet);
}

export async function PUT(req, {params}){   
    const get = await req.json();
    const q = await queryExecute(`update Table new_table set name=? where num=?`,[data.name,params.num])

    const getGet = await queryExecute('select * from new_table');
    
    return Response.json(getGet);
}