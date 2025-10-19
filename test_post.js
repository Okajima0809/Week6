import "dotenv/config"; // `.env.local` の環境変数(supabaseのURLとAPIキー)を読み込む
import fetch from "node-fetch"; // Node.js で fetch を使うために必要

//新規でレコードを追加する
const addUser = async (username) => {
    const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/userTable`;//urlの後にrest/v1の後に条件をつける
    const id=Math.floor(Math.random()*1000000);
  
    await fetch(url, {
      method: "post",//メソッドで”POST”を指定
      headers: { //envファイルからAPIキーを取得
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json"
      },
      body:JSON.stringify({id,username})//新しくデータを追加するときはbodyが必要
    })
 };

//指定されたユーザーを操作する
 const updateUser = async (id,newUsername) => {
   const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/userTable?id=eq.${id}` ;
 
   const response = await fetch(url, {
     method: "PATCH",//メソッドで”GET”を指定
     headers: { //envファイルからAPIキーを取得
       "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
       "Authorization": `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
       "Content-Type": "application/json"
     },
     body:JSON.stringify({username:newUsername})
   });
};

updateUser(2,"田中花子");

// DELETE: ユーザー削除

const deleteUser = async (id) => {
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/userTable?id=eq.${id}`;
  const response = await fetch(url, {

    method: "DELETE",
    headers: {
      "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      "Authorization": `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
    }
  });
  console.log(`ユーザーID ${id} を削除しました`);
};

deleteUser(3);