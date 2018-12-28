

exports.home_page = ((req, res) => {
    res.render("index", {
        userid: false
    });
});