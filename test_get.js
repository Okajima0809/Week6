import "dotenv/config"; // `.env.local` の環境変数(supabaseのURLとAPIキー)を読み込む
import fetch from "node-fetch"; // Node.js で fetch を使うために必要


const fetchAllUsers = async () => {
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/userTable`;//urlの後にrest/v1の後に条件をつける
  console.log("リクエストURL:", url); // **ここでURLが正しいか確認**

  const response = await fetch(url, {
    method: "GET",//メソッドで”GET”を指定
    headers: { //envファイルからAPIキーを取得
      "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      "Authorization": `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json"
    }
  });

//ターミナルで表示・エラー処理を実施
  if (!response.ok) {
    throw new Error(`HTTPエラー!ステータス: ${response.status}`);
  }

  const data = await response.json();
  console.log("①取得したユーザー一覧:", data);
};

  // **ここで関数を実行する！**
    fetchAllUsers();




//取得するカラムを指定する
 const fetchSelectedColumns = async () => {

    const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/userTable?select=id,username`, {//?select=id,usernameで抽出する値を指定
      method: "GET",
      headers: {
        "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json"
      }
    });

 
    const data = await response.json();

    console.log("②選択したカラムのみ:", data);

  };

  fetchSelectedColumns();


//名前を条件にレコードを取得(引数で田中太郎を渡す)
 const fetchUserByName = async (username) => {

    const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/userTable?username=eq.${username}&select=id,username`, {
      method: "GET",
      headers: {
        "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();
    console.log(`③ユーザー名「${username}」のデータ:`, data);
  };

  fetchUserByName("田中太郎");


//descで降順で取得する
 const fetchSortedUsers = async (order = "desc") => {

    const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/userTable?select=id,username,created_at&order=created_at.${order}`, {

      method: "GET",
      headers: {
        "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();
    console.log(`④作成日時降順（${order}）のユーザー一覧:`, data);
  };

  fetchSortedUsers("desc"); // 降順

