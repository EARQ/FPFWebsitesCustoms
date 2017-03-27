var nodes = search.luceneSearch("+PATH:\"/app:company_home/st:sites/cm:jurdico/cm:documentLibrary/cm:PROCESSOS//*\" AND TYPE:\"earq:processo\" ");

if (nodes == null || nodes.length == 0) {
    status.code = 404;
    status.message = "Nenhum registro encontrado";
    status.redirect = true;
} else {

	var processos = new Array();
	var i = 0;

	for each(var node in nodes) {

		var processo = new Array();

		processo[0] = i;
		processo[1] = node.nodeRef.toString();
		processo[2] = node.properties["cm:name"];
		processo[3] = node.properties["cm:title"].replace(new RegExp("\r?\n","g"), "<br>").replace(/"/g, "'");
		processo[4] = node.properties["cm:description"].replace(new RegExp("\r?\n","g"), "<br>").replace(/"/g, "'");
		processo[5] = (node.properties["earq:processo"] == null || node.properties["earq:processo"].length == 0) ? "" : node.properties["earq:processo"];
		processo[6] = (node.properties["earq:classe"] == null || node.properties["earq:classe"].length == 0) ? "" : node.properties["earq:classe"];
		processo[7] = (node.properties["earq:assunto"] == null || node.properties["earq:assunto"].length == 0) ? "" : node.properties["earq:assunto"];
		processo[8] = dataFormatter(node.properties["earq:datadistribuicao"]);
		processo[9] = (node.properties["earq:controle"] == null || node.properties["earq:controle"].length == 0) ? "" : node.properties["earq:controle"];
		processo[10] = (node.properties["earq:juiz"] == null || node.properties["earq:juiz"].length == 0) ? "" : node.properties["earq:juiz"];
		processo[11] = (node.properties["earq:tribunal"] == null || node.properties["earq:tribunal"].length == 0) ? "" : node.properties["earq:tribunal"];
		processo[12] = (node.properties["earq:origem"] == null || node.properties["earq:origem"].length == 0) ? "" : node.properties["earq:origem"];
		processo[13] = (node.properties["earq:parte"] == null || node.properties["earq:parte"].length == 0) ? "" : node.properties["earq:parte"];
		processo[14] = (node.properties["earq:status"] == null || node.properties["earq:status"].length == 0) ? "" : node.properties["earq:status"];
		processo[15] = (node.properties["earq:valor"] == null || node.properties["earq:valor"].length == 0) ? "" : node.properties["earq:valor"];
		processo[16] = (node.properties["earq:prognostico"] == null || node.properties["earq:prognostico"].length == 0) ? "" : node.properties["earq:prognostico"];
		processo[17] = (node.properties["earq:procurador"] == null || node.properties["earq:procurador"].length == 0) ? "" : node.properties["earq:procurador"];

		processos[i++] = processo;
	}

    model.processos = processos;
    model.qtde = processos.length;
}

function dataFormatter(dataParam) {

	var strDate = "";

	if(dataParam != null) {

		var fromdate = new Date(dataParam);

		var dd = fromdate.getDate();
		var mm = fromdate.getMonth()+1; //January is 0!
		var yyyy = fromdate.getFullYear();
		if(dd < 10)
		{
			dd = '0'+ dd;
		}
		if(mm < 10)
		{
			mm = '0' + mm;
		}
		strDate = dd+'/'+mm+'/'+yyyy;
	}

	return strDate;

}

function getBoolean(flag) {

	if(flag != null && flag == true) {
		return "Sim";

	} else {
		return "Nao";
	}
}