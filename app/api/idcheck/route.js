import { queryExecute } from "../Db";

export async function GET(req) {
    const id = req.nextUrl.searchParams.get('id');
    let data = await queryExecute("SELECT * from member where id=?" ,[id])

    console.log(data)
    if(data.length) {return Response.json("중복")
    } else {return Response.json("사용")}
}