/* import { queryExecute } from "./Db";

export async function POST(req) {
  const {
    id,
    password,
    name,
    gender,
    adderss,
    date,
    time,
    calendartype,
    job,
    self,
    kakao,
    privacy,
  } = await req.json();
  const data = await queryExecute(
    `insert into member(id,password,name,gender,adderss,date,time,calendartype,job,self,kakao,privacy)
    values(?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      id,
      password,
      name,
      gender,
      adderss,
      date,
      time,
      calendartype,
      job,
      self,
      kakao,
      privacy,
    ]
  );
  const data2 = await queryExecute(
    `insert into fortune(id)
    values(?)`,
    [id]
  );
  const data3 = await queryExecute(
    `insert into community (title,contents,img) values(?,?,?)`,
    [title, contents, img]
  );
  return Response.json({ member: data, fortune: data2, community: data3 });
}

export async function GET() {
  data = await queryExecute("SELECT * from member");
  data2 = await queryExecute("SELECT * from fortune");
  data3 = await queryExecute(`SELECT * from community`);
  return Response.json({ member: data, fortune: data2, community: data3 });
}
 */