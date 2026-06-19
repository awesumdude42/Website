import { NextResponse } from 'next/server'; 
import { Resend } from 'resend'; 




const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) { 
  try { 
    const info = await request.json(); 
    const { name, businessName, email, message, tierPackage } = info; 

    const { data, error } = await resend.emails.send({ 
        
        from: 'onboarding@resend.dev',
        to: 'cybercreationstudios@gmail.com',
        subject: `New Possible Client: ${businessName}`, 
        html: ` 
        <p><strong>Name:</strong> ${name}</p> 
        <p><strong>Business:</strong> ${businessName}</p> 
        <p><strong>Email:</strong> ${email}</p> 
        <p><strong>Package:</strong> ${tierPackage}</p> 
        <p><strong>Message:</strong> ${message}</p>`

    }); 

    if (error) return NextResponse.json({ error }, { status: 400 }); 
    return NextResponse.json({ data }); 
  } catch (err) { 
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 }); 
  } 
}