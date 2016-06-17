function connectionBar(parentDiv){
    var connectionBar=$("#"+parentDiv);
    connectionBar.css("background-color", "#bbb");
    
    var headline=$("<h3>",{text:"Choose one option to start playing", class:"text-uppercase text-center"});
    
    var panel1=$("<div>",{class:"panel panel-default"});
    var conn1=$("<div>",{class:"panel-body text-center",text:"Type URL to browser: shortlink.net"});
    panel1.append(conn1);
    
    var panel2=$("<div>",{class:"panel panel-default"});
    var conn2=$("<div>",{class:"panel-body"});
    var qrCode=$("<img>", {src:"../images/qr.png", style:"width:150px"});
    conn2.append(qrCode);
    panel2.append(conn2);
    
    connectionBar.append(headline);
    connectionBar.append(panel1);
    connectionBar.append(panel2);
}