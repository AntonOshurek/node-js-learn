# Code Styleguide

## 📝 Import Style Guide

### ✅ Purpose

Define the exact order and grouping of imports in all files for consistency and readability.

---

## #🔷 Import Order

1. **NestJS core modules**

```ts
import { Module } from '@nestjs/common';
```

2. **MODULES**

```ts
import { UserModule } from './user/user.module';
```

3. **CONTROLLERS**

```ts
import { UserController } from './user.controller';
```

4. **SERVICES**

```ts
import { UserService } from './user.service';
```

5. **DB**

```ts
import { MongooseModule } from '@nestjs/mongoose';
```

6. **ENTITIES**

```ts
import { User, UserSchema } from './entities/user.entity';
```

7. **DTO**

```ts
import { CreateUserDto } from './dto/create-user.dto';
```

8. **LIBS**

```ts
import { genSaltSync, hash } from 'bcrypt';
```

---

## 🔷 Additional Rules

- Keep imports grouped **exactly in this order**.
- Use **uppercase comments** to clearly mark each group, as in the example.

---

## 💡 Example

```ts
import { Module } from '@nestjs/common';
//SERVICES
import { UserService } from './user.service';
//CONTROLLERS
import { UserController } from './user.controller';
//DB
import { MongooseModule } from '@nestjs/mongoose';
//ENTITIES
import { User, UserSchema } from './entities/user.entity';
```