// import { NextResponse } from 'next/server';

// export async function POST(req: Request) {
//   const { email, password } = await req.json();
//   console.log('Received login request:', { email, password });

//   // if (email === 'test@test.com' && password === '1234') {
//   //   const response = NextResponse.json({ success: true });

//   //   response.cookies.set('session', 'logged-in', {
//   //     httpOnly: true,
//   //     path: '/',
//   //     sameSite: 'lax',
//   //     secure: false,
//   //   });

//   //   return response;
//   // }

//   return NextResponse.json(
//     { success: false, message: 'Invalid credentials' },
//     { status: 401 }
//   );
// }