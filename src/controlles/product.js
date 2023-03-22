import Joi from "joi";
import Product from "../model/product";

const productSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number(),
    desc: Joi.string().required(),
    status: Joi.boolean(),
    quanlity: Joi.number(),
})


export const getAll = async (req, res ) => {
    try {
        const data = await Product.find();
        if(data.length == 0){
            return res.json({
                message: "Khong co san pham nao"
            })
        }
        return res.json(data);
        
    } catch (error) {
        return res.json({
            message : error
        })
        
    }
};


export const get = async (req, res ) => {
    try {
        const id = req.params.id;
        const data = await Product.findOne({_id : id});
        if(data.length === 0){
            return res.status(200).json({
                message: "Khong co san pham nao"
            })
        }
        return res.json(data);
        
    } catch (error) {
        return res.status(400).json({
            message : error
        })
        
    }
};


export const create = async (req,res) => {
    try {
        const body = req.body;
        const {error} = productSchema.validate(body);
        if(error){
            return res.json({
                message: error.details[0].message,
            });
        }
        const data = await Product.create(body);
        if(data.length === 0){
            return res.status(400).json({
                message: "Them san pham that bai"
            })
        }
        return res.status(200).json({
            message: "Them san pham thanh cong",
            data,
        })
        
    } catch (error) {
        return res.status(400).json({
            message: error,
        })
        
    }
}

export const remove = async (req, res) => {
    try {
        const data = await Product.findByIdAndDelete(req.params.id);
        return res.json({
           message: " Xoa san pham thanh cong",
            data,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};


export const update = async (req, res) => {
    try {
        const data = await Product.findOneAndUpdate({ _id: req.params.id }, req.body, {new: true});
        if (!data) {
            return res.status(400).json({
                message: "Cap nhat khong thanh cong",
            });
        }
        return res.json({
            message: "Cap nhat thanh cong",
            data,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};