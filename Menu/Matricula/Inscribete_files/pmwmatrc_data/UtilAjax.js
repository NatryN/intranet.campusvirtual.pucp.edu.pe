//funciones dom
function pucpRemoveChildTree (obj) {
    if (!!!this.firstChild) return; //es una hoja sin hijos
    while (!!this.firstChild) {
        $(this.firstChild).removeChildTree();
    }
}

function pucpCreateElementWithText (tag,text) {
    var e = this.createAppendElement(tag);
    if (!!text)e.innerHTML=text;
    return e;
}

function pucpRemoveChilds () {
    while (!!this.firstChild) {
        this.removeChild(this.firstChild);
    }
}

function pucpCreateElement (tag) {
    var e = document.createElement(tag);
    return $(e);
}

function pucpCreateAppendElement (tag) {
    var e = pucpCreateElement(tag);
    this.appendChild(e);
    return e;
}

function pucpCreateOption (value, caption) {
    var opt = this.createAppendElement("option");
    opt.value = value;
    opt.innerHTML = caption;
    return opt;
}

function pucpCreateTable () {
    return this.createAppendElement("table");
}

function pucpCreateTbody () {
    return this.createAppendElement("tbody");
}

function pucpCreateTr () {
    return this.createAppendElement("tr");
}

function pucpCreateTh (text) {
    return this.createElementWithText("th",text);
}

function pucpCreateTd (text) {
    return this.createElementWithText("td",text);
}

function pucpCreateSpan (text) {
    return this.createElementWithText("span",text);
}

function pucpRowAddText (texts,classes) {
    for (var i = 0; i < texts.length; i++) {
        var td = this.createTd(texts[i]);
        if (!!classes && !!classes[i]) {td.className = classes[i];}
    }
}

function pucpCreateInput (type,name,value) {
    var e  = pucpCreateElement("input");
    e.type = type;
    e.name = name;
    e.value = value;
    e.id = name;
    this.appendChild(e);
    return e;
}

function pucpRowAddMultilineText (rowspan,texts,classes) {
    for (var i = 0; i < texts.length; i++) {
        var td = this.createTd(texts[i]);
        td.rowSpan = rowspan;
        if (!!classes && !!classes[i]) {td.className = classes[i];}
    }
}

function $ (id) {
    if (typeof (id) == "string") {
        id = document.getElementById(id);
    }
    if (!!!id.pucpEnabled) {
        id.removeChilds = pucpRemoveChilds;
        id.removeChildTree = pucpRemoveChildTree;
        id.createAppendElement = pucpCreateAppendElement;
        id.createElementWithText = pucpCreateElementWithText;
        //Objetos dom
        id.createInput = pucpCreateInput;
        id.createOption = pucpCreateOption;
        id.createSpan = pucpCreateSpan;
        id.createTable = pucpCreateTable;
        id.createTbody = pucpCreateTbody;
        id.createTd = pucpCreateTd;
        id.createTh = pucpCreateTh;
        id.createTr = pucpCreateTr;
        id.addTextRow = pucpRowAddText;
        id.addMultilineTextRow = pucpRowAddMultilineText;
        id.pucpEnabled = true;
    }
    return id;
}

function encodeParameters () {
    var s = "";
    for (var i = 0; i < arguments.length; i+=2) {
        if (i>0) s+= "&";
        s+= encodeURIComponent(arguments[i]) + "=" + encodeURIComponent(arguments[i+1]);
    }
    return s;
}

function appendParameters () {
    var s = "";
    for (var i = 0; i < arguments.length; i+=2) {
        if (i>0) s+= "&";
        s+= arguments[i];
    }
}

function trim(cadena, tc) {
    if (!!!tc) {
        tc = " ";
    }
    for(i=0; i<cadena.length; ) {
        if(cadena.charAt(i)==tc) cadena=cadena.substring(i+1, cadena.length);
        else break;
    }
    for(i=cadena.length-1; i>=0; i=cadena.length-1) {
        if(cadena.charAt(i)==tc) cadena=cadena.substring(0,i);
    else break;
    }
    return cadena;
}

function createRequest () {
    var xmlHttp=false;
    try{xmlHttp=new XMLHttpRequest();}
    catch(e){
        try{
            xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch(e){
            try{
                xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch(e){
                return false;
            }
        }
    }
    return xmlHttp;
}

function serveForm (delegate, args, target, parameters) {
    var req=createRequest();
        req.onreadystatechange=function(){
        if (req.readyState  == 4) {delegate (req, args);}
    }
    req.open("POST",target,true);
    req.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    req.send(parameters);
}