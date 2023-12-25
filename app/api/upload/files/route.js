import { queryExecute } from "../../Db"

export async function GET(){
    const q = 'select * from files'
    const data = await queryExecute(q)
    return Response.json(data)
}

export async function POST(req){
    const {title, imgURL} = await req.json();
    const q = 'insert into files (title, imgURL) values (?,?)'
    
    // const imgUrl = req.nextUrl.searchParams.get('imgUrl');
    await queryExecute(q,[title, imgURL])
    return Response.json({done: '성공~'})
}