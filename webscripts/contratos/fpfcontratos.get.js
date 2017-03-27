var nodes = search.luceneSearch("+PATH:\"/app:company_home/st:sites/cm:jurdico/cm:documentLibrary/cm:CONTRATOS//*\" AND TYPE:\"earq:contrato\" ");

if (nodes == null || nodes.length == 0) {
    status.code = 404;
    status.message = "Nenhum registro encontrado";
    status.redirect = true;
} else {

	var contratos = new Array();
	var i = 0;

	for each(var node in nodes) {

		var contrato = new Array();

		contrato[0] = i;
		contrato[1] = node.nodeRef.toString();

		contrato[2] = node.properties["cm:name"];
		contrato[3] = node.properties["cm:description"].replace(new RegExp("\r?\n","g"), "<br>").replace(/"/g, "'");
		contrato[4] = (node.properties["earq:razao"] == null || node.properties["earq:razao"].length == 0) ? "" : node.properties["earq:razao"];
		contrato[5] = (node.properties["earq:fantasia"] == null || node.properties["earq:fantasia"].length == 0) ? "" : node.properties["earq:fantasia"];
		contrato[6] = (node.properties["earq:cnpj"] == null || node.properties["earq:cnpj"].length == 0) ? "" : node.properties["earq:cnpj"];
		contrato[7] = dataFormatter(node.properties["earq:dataassinatura"]);
		contrato[8] = dataFormatter(node.properties["earq:vigencia"]);
		contrato[9] = (node.properties["earq:numeroproposta"] == null || node.properties["earq:numeroproposta"].length == 0) ? "" : node.properties["earq:numeroproposta"];
		contrato[10] = (node.properties["earq:numerocontrato"] == null || node.properties["earq:numerocontrato"].length == 0) ? "" : node.properties["earq:numerocontrato"];
		contrato[11] = (node.properties["earq:valoratual"] == null || node.properties["earq:valoratual"].length == 0) ? "" : node.properties["earq:valoratual"];
		contrato[12] = getBoolean(node.properties["earq:confidencial"]);
		contrato[13] = getBoolean(node.properties["earq:autorenovacao"]);
		contrato[14] = (node.properties["earq:tipocontrato"] == null || node.properties["earq:tipocontrato"].length == 0) ? "" : node.properties["earq:tipocontrato"];

		contratos[i++] = contrato;
	}

    model.contratos = contratos;
    model.qtde = contratos.length;
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