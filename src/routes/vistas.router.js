import { Router } from "express";

const route = Router();

route.get('/', async (req, res) => {
    try {
        const result = await paginate({}, { limit: 10, page: 1, sort: {} });
        res.json({
            status: "success",  
            payload: result,   
            totalPages: result.totalPages, 
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.hasPrevPage ? `/api/products?page=${result.prevPage}` : null,
            nextLink: result.hasNextPage ? `/api/products?page=${result.nextPage}` : null
        });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

export default route;