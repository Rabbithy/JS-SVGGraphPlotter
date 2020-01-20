const graph_width = 520;
const graph_height = 320;

var svgNS = "http://www.w3.org/2000/svg";
var svg_draw = document.getElementById("svg-draw");


function create_lineargradient(id_name, x1, y1, x2, y2, colors) {
    var defs = document.createElementNS(svgNS, "defs");
    var linear_gradient = document.createElementNS(svgNS, "linearGradient");
    
    linear_gradient.setAttributeNS(null, "id", id_name);
    linear_gradient.setAttributeNS(null, "x1", x1);
    linear_gradient.setAttributeNS(null, "y1", y1);
    linear_gradient.setAttributeNS(null, "x2", x2);
    linear_gradient.setAttributeNS(null, "y2", y2);

    for (let i=0; i < colors.length; i++) {
        var p = document.createElementNS(svgNS, "stop");
        const offset = i / (colors.length - 1) * 100 + "%";
        const style = "stop-color:" + colors[i] + "; stop-opacity:1;";
        p.setAttributeNS(null, "offset", offset);
        p.setAttributeNS(null, "style", style);
        linear_gradient.appendChild(p);
    }

    defs.appendChild(linear_gradient);
    svg_draw.appendChild(defs);
}

function draw_rectangle(x, y, width, height, style) {
    var rectangle = document.createElementNS(svgNS, "rect");
    rectangle.setAttributeNS(null, "x", x);
    rectangle.setAttributeNS(null, "y", y);
    rectangle.setAttributeNS(null, "width", width);
    rectangle.setAttributeNS(null, "height", height);
    rectangle.setAttributeNS(null, "style", style);
    svg_draw.appendChild(rectangle);
}

function draw_line(x1, y1, x2, y2, style) {
    var line = document.createElementNS(svgNS, "line");
    line.setAttributeNS(null, "x1", x1);
    line.setAttributeNS(null, "y1", y1);
    line.setAttributeNS(null, "x2", x2);
    line.setAttributeNS(null, "y2", y2);
    line.setAttributeNS(null, "style", style);
    svg_draw.appendChild(line);
}

function draw_circle(cx, cy, r, style) {
    var circle = document.createElementNS(svgNS, "circle");
    circle.setAttributeNS(null, "cx", cx);
    circle.setAttributeNS(null, "cy", cy);
    circle.setAttributeNS(null, "r", r);
    circle.setAttributeNS(null, "style", style);
    svg_draw.appendChild(circle);
}

function draw_graph_base() {
    create_lineargradient("bg-gradient", "0%", "0%", "0%", "100%", ["#556a", "#333a"]);
    draw_rectangle(20, 20, 500, 300, "fill: url(#bg-gradient); opacity: 1;")

    draw_line(20, 20, 20, 320, "stroke: #111; stroke-width: 1px;");    
    draw_line(20, 320, 520, 320, "stroke: #111; stroke-width: 1px;");
    
    for (let i=1; i < graph_width / 20; i++) {
        draw_line(20 + i * 20, 20, 20 + i * 20, 320, "stroke: #222; stroke-width: 0.4px;");
    }
    for (let j=1; j < graph_height / 20; j++) {
        draw_line(20, (j + 1) * 20, 520, (j + 1) * 20, "stroke: #222; stroke-width: 0.4px;");
    }
}

function plot(points, color) {
    var point_distance = graph_width / (points.length+3);
    const linestyle = "stroke: " + color + "; stroke-width: 1.5px;";
    const pointstyle = "stroke: " + color + "; stroke-width: 1px; fill: black;"

    for (let i = 0; i < points.length - 1; i++) {
        const xpos1 = point_distance * i + 20;
        const ypos1 = 320 - points[i];
        const xpos2 = xpos1 + point_distance;
        const ypos2 = 320 - points[i + 1];
        draw_line(xpos1, ypos1, xpos2, ypos2, linestyle);
    }
    for (let i = 1; i < points.length - 1; i++) {
        const xpos = point_distance * i + 20;
        const ypos = 320 - points[i];
        draw_circle(xpos, ypos, 3, pointstyle);
    }
    
}

function draw_graph() {
    draw_graph_base();

    var points1 = [127, 129, 187, 79, 185, 186, 102, 173, 130, 98, 175, 184, 102, 188, 94, 169, 154, 92, 148, 61, 159, 62, 81, 88, 52, 127, 60, 63, 143, 107, 51, 155, 89, 110, 112, 176, 55, 57, 117, 68, 74, 109, 146, 172, 67, 54, 197, 117, 161, 156, 93, 127, 170, 126, 158, 194, 98, 55, 119, 147, 175, 97, 116, 86, 98, 117, 109, 176, 136, 174, 167, 106, 99, 200, 117, 195, 108, 66, 93, 121, 170, 104, 103, 123, 165, 188, 160, 191, 79, 114, 128, 160, 52, 148, 178, 120, 105, 146, 52, 128];
    var points2 = [128.0, 158.0, 133.0, 132.0, 185.5, 144.0, 137.5, 151.5, 114.0, 136.5, 179.5, 143.0, 145.0, 141.0, 131.5, 161.5, 123.0, 120.0, 104.5, 110.0, 110.5, 71.5, 84.5, 70.0, 89.5, 93.5, 61.5, 103.0, 125.0, 79.0, 103.0, 122.0, 99.5, 111.0, 144.0, 115.5, 56.0, 87.0, 92.5, 71.0, 91.5, 127.5, 159.0, 119.5, 60.5, 125.5, 157.0, 139.0, 158.5, 124.5, 110.0, 148.5, 148.0, 142.0, 176.0, 146.0, 76.5, 87.0, 133.0, 161.0, 136.0, 106.5, 101.0, 92.0, 107.5, 113.0, 142.5, 156.0, 155.0, 170.5, 136.5, 102.5, 149.5, 158.5, 156.0, 151.5, 87.0, 79.5, 107.0, 145.5, 137.0, 103.5, 113.0, 144.0, 176.5, 174.0, 175.5, 135.0, 96.5, 121.0, 144.0, 106.0, 100.0, 163.0, 149.0, 112.5, 125.5, 99.0, 90.0, 128];
    plot(points1, "#b89398");
    plot(points2, "#05ff4c");
}

draw_graph();