const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main(){
  const room1 = await prisma.room.upsert({
    where:{
      id:1
    },
    update:{},
    create:{
      quantity:3,
      price:4000,
      roomType:'SIMPLE_SINGLE',
      description:'2 Single beds, Refrigerator, Hair Dryer,LCD TV 42 Inches, and Private Vault.',
      size:70,
      bed_size:'120x200',
      capacity:2,
      floor:2
    }
  })

  const room2 = await prisma.room.upsert({
    where:{
      id:2
    },
    update:{},
    create:{
      quantity:3,
      price:4500,
      roomType:'PREMIUM_SINGLE',
      description:'2 Single beds, Refrigerator, Hair Dryer,LCD TV 50 Inches, and Private Vault.',
      size:70,
      bed_size:'120x200',
      capacity:2,
      floor:2
    }
  })

  const room3 = await prisma.room.upsert({
    where:{
      id:3
    },
    update:{},
    create:{
      quantity:3,
      price:5500,
      roomType:'SIMPLE_COUPLE',
      description:'1 King bed, Refrigerator, Hair Dryer,LCD TV 42 Inches, and Private Vault.',
      size:70,
      bed_size:'160x240',
      capacity:2,
      floor:2
    }
  })

  const room4 = await prisma.room.upsert({
    where:{
      id:4
    },
    update:{},
    create:{
      quantity:3,
      price:6500,
      roomType:'PREMIUM_COUPLE',
      description:'1 King bed, Refrigerator, Hair Dryer,LCD TV 50 Inches, and Private Vault.',
      size:90,
      bed_size:'160x240',
      capacity:2,
      floor:2
    }
  })
}


main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
