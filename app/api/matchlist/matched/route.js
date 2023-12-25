import { queryExecute } from "../../Db"; 

export async function GET(req) {
    const id = req.nextUrl.searchParams.get('id');
    const opntid = req.nextUrl.searchParams.get('opntid');
    const matchData = await queryExecute (
        `SELECT * FROM mariadb_test.matchlist WHERE id='${id}' AND opntid='${opntid}' AND y_status='yes'`
    );
    console.log(matchData);
    let data = {};
    if (matchData) {
        data = await queryExecute(`
            SELECT id, name, gender, adderss, date, time, calendartype, job, self, kakao from member WHERE id = '${id}'`
        );
    }
    
  
    return Response.json(data[0]);
  }