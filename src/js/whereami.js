<<<<<<< HEAD
;(function (doc) {
  'use strict'

  var hostname = doc.location.hostname

  var flags = []

  if (hostname.indexOf('prodstage') != -1 || hostname.indexOf('stage') != -1) {
    flags.push('stage')
  } else if (hostname.indexOf('local') != -1) {
    flags.push('local')
  }

  if (hostname.indexOf('edit') != -1) {
    flags.push('admin')
  }

  var div = doc.createElementNS('http://www.w3.org/1999/xhtml', 'div')
  div.className = 'whereami-flags'

  var ul = doc.createElementNS('http://www.w3.org/1999/xhtml', 'ul')

  for (var i = 0; i < flags.length; i++) {
    var li = doc.createElementNS('http://www.w3.org/1999/xhtml', 'li')
    var span = doc.createElementNS('http://www.w3.org/1999/xhtml', 'span')

    span.innerHTML = flags[i]
    li.appendChild(span)
    li.className = 'whereami-flags_' + flags[i]

    ul.appendChild(li)
  }

  div.appendChild(ul)

  doc.body.appendChild(div)
})(document)
=======
const createBorder = (enviroment = "") => {
	const element = document.createElement("div");

	element.classList.add("whereami-flags");
	element.classList.add("stage");
	element.title = `Você está no ambiente de ${enviroment}`;
	element.id = "whereami";

	return element;
};

const hasConfiguration = () => {
	return false;
};

const verify = () => {
	if (!hasConfiguration()) {
		const body = document.querySelector("body");
		body.append(createBorder("Desenvolvimento"));
	}
};

verify();
>>>>>>> parent of 38e03aa (Ajustes)
