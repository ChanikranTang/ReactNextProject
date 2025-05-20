export async function GET(request,{params}){
    console.log('log : test')
    return Response.json({
        name: 'testapi',
        id : params.id,
    })
}