import { queryExecute } from "../Db"; 

export async function POST(req) {
  const { id, opntid, m_status, y_status, date } = await req.json();

  const data = await queryExecute(
    `insert into matchlist(id, opntid, m_status, y_status, date) values(?,?,?,?,?)`,[id, opntid, m_status, y_status, date]
  );

  return Response.json({done:'성공!!'});
}

export async function GET(req) {
  // myPick이 true : 내가 찜한 애
  // myPick이 false : 나를 찜한 애
  const myPick = req.nextUrl.searchParams.get('myPick');
  const id = req.nextUrl.searchParams.get('id');
  const job = req.nextUrl.searchParams.get('job');
  
  let data;
  if (myPick === 'true') {
    data = await queryExecute (
      `SELECT * FROM mariadb_test.matchlist WHERE id='${id}'`
    )
  } else {
    data = await queryExecute (
      `SELECT * FROM mariadb_test.matchlist WHERE opntid='${id}'`
    )
  }

  return Response.json(data);
}

export async function PUT(req) {
  const { id, opntid, y_status } = await req.json();
  console.log('PUT :', id, opntid, y_status)
  const data = await queryExecute (
    `UPDATE mariadb_test.matchlist SET y_status='${y_status}' WHERE id='${id}' AND opntid='${opntid}'`
  );

  return Response.json({done:'성공!!'});
}