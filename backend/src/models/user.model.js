import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true, // index we use for searching purpose
    },
    fullName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true, // index we use for searching purpose
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    avatar: {
      type: String, // cloudinary url
      required: true,
    },
    refreshToken: {
      type: String,
    },
    role: {
      type: String,
      enum: ["buyer", "seller"],
      default: "buyer", // Default is buyer
    },

    carts: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        color: {
          type: String,
        },
        price: {
          type: Number,
        },
        addedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
  next();
};

// jwt.sign(payload, secretOrPrivateKey, options)

userSchema.methods.generateAccessToken = function () {
  // we have added the function here using .methods
  return jwt.sign(
    {
      _id: this.id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },

    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

// userSchema.methods.generateAccessToken = function () {
//   return jwt.sign(
//     {
//       _id: this._id,
//       username: this.username,
//       email: this.email,
//     },
//     process.env.ACCESS_TOKEN_SECRET,
//     {
//       expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
//     }
//   );
// };

// userSchema.methods.generateRefreshToken = function () {
//   return jwt.sign(
//     {
//       _id: this._id,
//     },
//     process.env.REFRESH_TOKEN_SECRET,
//     {
//       expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
//     }
//   );
// };

userSchema.methods.addToCart = async function ({
  product,
  quantity = 1,
  color,
  price,
}) {
  try {
    // Check if the product already exists in cart (optional: prevent duplicates or increment quantity)
    const existingItem = this.carts.find(
      (item) =>
        item.product.toString() === product.toString() && item.color === color
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.carts.push({
        product,
        quantity,
        color,
        price,
      });
    }

    await this.save();
    return this.carts;
  } catch (error) {
    throw error;
  }
};

export const User = mongoose.model("User", userSchema);
