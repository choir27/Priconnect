module.exports = {
    getHome: async(req, res) => {
        try{
            res.status(500).send({msg: "hello world"});
        }catch(error){
            console.error(error);
            res.status(500).send("Internal server error");
        }
    }
}