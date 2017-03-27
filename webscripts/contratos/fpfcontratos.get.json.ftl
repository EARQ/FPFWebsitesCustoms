<#assign datetimeformat="dd/MMM/yyyy">
{"data" : [
    <#list contratos as contrato>
        [
		"${contrato[0]}",        
		"${contrato[1]}",
		"${contrato[2]}",
		"${contrato[3]}",
		"${contrato[4]}",
		"${contrato[5]}",
		"${contrato[6]}",		
		"${contrato[7]}",
		"${contrato[8]}",
		"${contrato[9]}",
		"${contrato[10]}",
		"${contrato[11]}",
		"${contrato[12]}",
		"${contrato[13]}",		
		"${contrato[14]}"
        ]
	<#if !(contrato[0] == (qtde-1))>,</#if>        
    </#list>
    ]
}
