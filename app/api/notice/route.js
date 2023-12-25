import { queryExecute } from "../Db";


export async function GET() {
    const data = await queryExecute("SELECT * from notice");
    return Response.json(data);
}
