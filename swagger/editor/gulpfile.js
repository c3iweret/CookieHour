var gulp = require("gulp");
var yaml = require("js-yaml");
var path = require("path");
var fs = require("fs");

// converts yaml to json 
gulp.task("swagger", function() {
    var doc = yaml.safeLoad(fs.readFileSync(path.join(__dirname, "api/swagger/swagger.yaml")));
    fs.writeFileSync(
        path.join(__dirname, "../swagger-ui/cookiehour-api.json"),
        JSON.stringify(doc, null, " ")
    );
    gulp.watch("api/swagger/swagger.yaml", gulp.series("swagger"));
});

// observes for changes
gulp.task("watch", function() {
    gulp.watch("api/swagger/swagger.yaml", gulp.series("swagger"));
})