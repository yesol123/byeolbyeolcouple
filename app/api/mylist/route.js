import { queryExecute } from "../Db";

export async function POST(req) {
  const { id, opntid, gender, active } = await req.json();

  // 중복 체크
  const existingData = await queryExecute(
    `SELECT * from mylist WHERE id = ? AND opntid = ?`,
    [id, opntid]
  );

  // 중복된 데이터가 없을 경우에만 새로운 데이터를 추가
  let data;
  if (existingData.length === 0) {
    data = await queryExecute(
      `INSERT INTO mylist (id, opntid, gender, active) VALUES (?, ?, ?, ?)`,
      [id, opntid, gender, active]
    );
  } else {
    data = { message: "Data already exists" };
  }

  return Response.json(data);
}

export async function PUT(req) {
  const { id, opntid, active } = await req.json();
  const data = await queryExecute(
    `UPDATE mylist 
         SET active = ?, 
         WHERE id = ? AND opntid = ?`,
    [active, id, opntid]
  );
  return Response.json(data);
}

export async function GET() {
  let data = [];

  data = await queryExecute("SELECT * from mylist");

  return Response.json(data);
}
