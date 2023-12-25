import { queryExecute } from "../Db";

export async function POST(req) {
  const { category, title, contents, img, date } = await req.json();
  const data = await queryExecute(
    `insert into community (category,title,contents,img,date) values(?,?,?,?,?)`,
    [category, title, contents, img, date]
  );
  return Response.json(data);
}

export async function PUT(req) {
  const num = req.nextUrl.searchParams.get("num");
  const type = req.nextUrl.searchParams.get("type");

  let data = [];
  if (type == "likeCheck") {
    const { peoplelike, num } = await req.json();
    console.log(peoplelike, num, "---------------");
    data = await queryExecute(
      `UPDATE community SET peoplelike = ? WHERE num = ?`,
      [peoplelike, num]
    );
  } else {
    const { title, contents, img, num } = await req.json();
    data = await queryExecute(
      `UPDATE community SET title = ?, contents = ?, img = ? WHERE num = ?`,
      [title, contents, img, num]
    );
  }

  return Response.json(data);
}

export async function GET() {
  const data = await queryExecute(
    `SELECT * from community ORDER BY date DESC;`
  );
  return Response.json(data);
}
