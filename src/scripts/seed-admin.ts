
import 'dotenv/config'
import bcrypt from 'bcrypt'
import { prisma } from '../prisma/prisma.service.js'
import { UserRole } from '../generated/prisma/client.js'

async function seedAdmin() {
  const name = process.env.ADMIN_NAME
  const email = process.env.ADMIN_EMAIL 
  const password = process.env.ADMIN_PASSWORD
  if (!name || !email || !password) { 
    throw new Error('Admin  variables are required')
 }

 const existingAdmin = await prisma.user.findUnique({ where: { email } })
  if (existingAdmin) { 
    console.log('Admin already exists')
    return
    } 
    const hashedPassword = await bcrypt.hash(password, 10)
    const admin = await prisma.user.create({ 
    data: { name, email, password: hashedPassword, role: UserRole.ADMIN, }, 
    select: { id: true, name: true, email: true, role: true, }
    })
    console.log(`Admin created successfully: ${admin.email}`)
}

seedAdmin()
.catch((error) => { 
    console.error('Failed to create admin:', error)
    process.exitCode = 1
 }) 
.finally(async () => { await prisma.$disconnect() })

