'use client'

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field"; import { Label }
from "@/components/ui/label"; import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { useState } from "react";


 export default function GetStarted()
  { 
    const [name,setName] = useState<string>("")
    const [bName,setBName] = useState<string>("")
    const [tierPackage,setPackage] = useState<string>("")
    const [email,setEmail] = useState<string>("")
    const [message,setMessage] = useState<string>(``)
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        setOpen(false);
        const payload = { 
        name: name, 
        businessName: bName, 
        email: email, 
        message: message, 
        tierPackage: tierPackage 
        }; 

        try {
        const response = await fetch('/api/send', { 
            method: 'POST', 
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload) 
        }); 
        
        const result = await response.json(); 
        console.log(result);
        } catch (error) {
        console.error("Submission failed:", error);
        }
  }; 

    
    const [open,setOpen] = useState<boolean>(false)
    return(
  <div>
    <Dialog open={open} onOpenChange={setOpen}>
         
            <DialogTrigger asChild>
                <Button className="bg-[#0D1936] hover:bg-[#0D1936] w-35 h-10 text-white font-mono">
                    Get Started
                </Button>
            </DialogTrigger>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>
                            Get started
                        </DialogTitle>
                        <DialogDescription className="mb-3">
                            Give us your contact information, and we will get back to you soon!
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup>
                        <Field>
                            <Label htmlFor="name-1">Your Name <span className="text-destructive">*</span> </Label>
                            <Input id="name-1" name="your name" required value={name} onChange={(e)=>setName(e.target.value)} placeholder="Your Name Here"/>
                        </Field>
                        <Field>
                            <Label htmlFor="bName-1">Business Name <span className="text-destructive">*</span> </Label>
                            <Input id="bName-1" name="bName" required value={bName} onChange={(e)=>setBName(e.target.value)} placeholder="Business Name"/>
                        </Field>
                        <Field>
                            <Label htmlFor="package-1">Package <span className="text-destructive">*</span> </Label>
                            <Select value={tierPackage} required onValueChange={setPackage}>
                                <SelectTrigger className="w-45">
                                    <SelectValue placeholder="Select Package"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="Full Tier">Complete Package</SelectItem>
                                        <SelectItem value="Basic Tier">Basic Package</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </Field>
                        <Field>
                            <Label htmlFor="email-1">Reply Email <span className="text-destructive">*</span> </Label>
                            <Input id="email-1" name="email" type="email" required value={email} onChange={(e)=>setEmail(e.target.value)}  placeholder="Email"/>
                        </Field>
                        <Field>
                            <Label htmlFor="message-1">Message</Label>
                            <Textarea id="message-1" value={message} onChange={(e)=>setMessage(e.target.value)} placeholder="Message" />
                        </Field>
                    </FieldGroup>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">
                            Submit
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        
    </Dialog>
</div>
    );
}





