import { queryExecute } from "../Db";


export async function POST(req) {
  const {user_id, community_num,contents} = await req.json();
  const data = await queryExecute( `insert into reply (user_id,contents,community_num) values(?,?,?)`,
  [user_id,contents,community_num]
);
return Response.json(data);
}




export async function GET() {
    const data = await queryExecute("SELECT * from reply"  );
    return Response.json(data);
}
