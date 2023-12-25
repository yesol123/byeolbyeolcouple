import { queryExecute } from "../Db";

export async function POST(req,res) {
  const {id,password,name,gender,adderss,date,time,calendartype,job,self,kakao, privacy,} = await req.json();
  const data = await queryExecute(
    `insert into member(id,password,name,gender,adderss,date,time,calendartype,job,self,kakao,privacy)
        values(?,?,?,?,?,?,?,?,?,?,?,?)`,
    [id,password, name,gender,adderss,date,time,calendartype,job,self,kakao,privacy,] );
  return Response.json(data);
}


export async function GET(req) {
  /* const {id,pw,type} = Object.fromEntries() */
  //let req = req;
  const id = req.nextUrl.searchParams.get('id');
  const pw = req.nextUrl.searchParams.get('pw');
  const type = req.nextUrl.searchParams.get('type');
  let data=[];
  if(type == 'login'){
    data = await queryExecute("SELECT * from member where id=? AND password=?",[id,pw]);
    console.log(data ,'------------')
  }else{
    data = await queryExecute("SELECT * from member");
  }
  

  return Response.json(data);
}
