import { queryExecute } from "../Db";

export async function POST(req) {
  const { id, fortune, myelement, yourelement } = await req.json();

  const data = await queryExecute(
    `insert into fortune(id,fortune,myelement,yourelement) values(?,?,?,?)`,
    [id, fortune, myelement, yourelement]
  );

  return Response.json(data);
}

export async function PUT(req) {
  const { id, fortune, myelement, yourelement } = await req.json();

  try {
    const data = await queryExecute(
      `UPDATE fortune 
           SET fortune = ?, myelement = ?, yourelement = ? 
           WHERE id = ?`,
      [fortune, myelement, yourelement, id]
    );

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error updating fortune:", error);
    return new Response(JSON.stringify({ error: "Error updating fortune" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export async function GET(req) {
  const id = req.nextUrl.searchParams.get("id");
  const type = req.nextUrl.searchParams.get("type");
  let data = [];

  if (type == "fortuneCheck") {
    data = await queryExecute("SELECT * from fortune where id = ?", [id]);
  } else {
    data = await queryExecute("SELECT * from fortune");
  }

  return Response.json(data);
}
