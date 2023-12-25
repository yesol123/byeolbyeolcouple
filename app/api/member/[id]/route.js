import { queryExecute } from "../../Db";

export async function GET(req, {params}) {
  const id = params.id;

  const data = await queryExecute(`
    SELECT id, name, gender, adderss, date, time, calendartype, job, self from member WHERE id = '${id}'`
  );


  return Response.json(data[0]);
}
