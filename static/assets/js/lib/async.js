(function(){function r(e){var n=false;return function(){if(n)throw new Error("Callback was already called.");n=true;e.apply(t,arguments)}}var e={};var t,n;t=this;if(t!=null){n=t.async}e.noConflict=function(){t.async=n;return e};var i=function(e,t){if(e.forEach){return e.forEach(t)}for(var n=0;n<e.length;n+=1){t(e[n],n,e)}};var s=function(e,t){if(e.map){return e.map(t)}var n=[];i(e,function(e,r,i){n.push(t(e,r,i))});return n};var o=function(e,t,n){if(e.reduce){return e.reduce(t,n)}i(e,function(e,r,i){n=t(n,e,r,i)});return n};var u=function(e){if(Object.keys){return Object.keys(e)}var t=[];for(var n in e){if(e.hasOwnProperty(n)){t.push(n)}}return t};if(typeof process==="undefined"||!process.nextTick){if(typeof setImmediate==="function"){e.nextTick=function(e){setImmediate(e)}}else{e.nextTick=function(e){setTimeout(e,0)}}}else{e.nextTick=process.nextTick}e.each=function(e,t,n){n=n||function(){};if(!e.length){return n()}var s=0;i(e,function(i){t(i,r(function(t){if(t){n(t);n=function(){}}else{s+=1;if(s>=e.length){n(null)}}}))})};e.forEach=e.each;e.eachSeries=function(t,n,r){r=r||function(){};if(!t.length){return r()}var i=0;var s=function(){var o=true;n(t[i],function(n){if(n){r(n);r=function(){}}else{i+=1;if(i>=t.length){r(null)}else{if(o){e.nextTick(s)}else{s()}}}});o=false};s()};e.forEachSeries=e.eachSeries;e.eachLimit=function(e,t,n,r){var i=a(t);i.apply(null,[e,n,r])};e.forEachLimit=e.eachLimit;var a=function(e){return function(t,n,r){r=r||function(){};if(!t.length||e<=0){return r()}var i=0;var s=0;var o=0;(function u(){if(i>=t.length){return r()}while(o<e&&s<t.length){s+=1;o+=1;n(t[s-1],function(e){if(e){r(e);r=function(){}}else{i+=1;o-=1;if(i>=t.length){r()}else{u()}}})}})()}};var f=function(t){return function(){var n=Array.prototype.slice.call(arguments);return t.apply(null,[e.each].concat(n))}};var l=function(e,t){return function(){var n=Array.prototype.slice.call(arguments);return t.apply(null,[a(e)].concat(n))}};var c=function(t){return function(){var n=Array.prototype.slice.call(arguments);return t.apply(null,[e.eachSeries].concat(n))}};var h=function(e,t,n,r){var i=[];t=s(t,function(e,t){return{index:t,value:e}});e(t,function(e,t){n(e.value,function(n,r){i[e.index]=r;t(n)})},function(e){r(e,i)})};e.map=f(h);e.mapSeries=c(h);e.mapLimit=function(e,t,n,r){return p(t)(e,n,r)};var p=function(e){return l(e,h)};e.reduce=function(t,n,r,i){e.eachSeries(t,function(e,t){r(n,e,function(e,r){n=r;t(e)})},function(e){i(e,n)})};e.inject=e.reduce;e.foldl=e.reduce;e.reduceRight=function(t,n,r,i){var o=s(t,function(e){return e}).reverse();e.reduce(o,n,r,i)};e.foldr=e.reduceRight;var d=function(e,t,n,r){var i=[];t=s(t,function(e,t){return{index:t,value:e}});e(t,function(e,t){n(e.value,function(n){if(n){i.push(e)}t()})},function(e){r(s(i.sort(function(e,t){return e.index-t.index}),function(e){return e.value}))})};e.filter=f(d);e.filterSeries=c(d);e.select=e.filter;e.selectSeries=e.filterSeries;var v=function(e,t,n,r){var i=[];t=s(t,function(e,t){return{index:t,value:e}});e(t,function(e,t){n(e.value,function(n){if(!n){i.push(e)}t()})},function(e){r(s(i.sort(function(e,t){return e.index-t.index}),function(e){return e.value}))})};e.reject=f(v);e.rejectSeries=c(v);var m=function(e,t,n,r){e(t,function(e,t){n(e,function(n){if(n){r(e);r=function(){}}else{t()}})},function(e){r()})};e.detect=f(m);e.detectSeries=c(m);e.some=function(t,n,r){e.each(t,function(e,t){n(e,function(e){if(e){r(true);r=function(){}}t()})},function(e){r(false)})};e.any=e.some;e.every=function(t,n,r){e.each(t,function(e,t){n(e,function(e){if(!e){r(false);r=function(){}}t()})},function(e){r(true)})};e.all=e.every;e.sortBy=function(t,n,r){e.map(t,function(e,t){n(e,function(n,r){if(n){t(n)}else{t(null,{value:e,criteria:r})}})},function(e,t){if(e){return r(e)}else{var n=function(e,t){var n=e.criteria,r=t.criteria;return n<r?-1:n>r?1:0};r(null,s(t.sort(n),function(e){return e.value}))}})};e.auto=function(t,n){n=n||function(){};var r=u(t);if(!r.length){return n(null)}var s={};var a=[];var f=function(e){a.unshift(e)};var l=function(e){for(var t=0;t<a.length;t+=1){if(a[t]===e){a.splice(t,1);return}}};var c=function(){i(a.slice(0),function(e){e()})};f(function(){if(u(s).length===r.length){n(null,s);n=function(){}}});i(r,function(r){var i=t[r]instanceof Function?[t[r]]:t[r];var u=function(t){if(t){n(t);n=function(){}}else{var i=Array.prototype.slice.call(arguments,1);if(i.length<=1){i=i[0]}s[r]=i;e.nextTick(c)}};var a=i.slice(0,Math.abs(i.length-1))||[];var h=function(){return o(a,function(e,t){return e&&s.hasOwnProperty(t)},true)&&!s.hasOwnProperty(r)};if(h()){i[i.length-1](u,s)}else{var p=function(){if(h()){l(p);i[i.length-1](u,s)}};f(p)}})};e.waterfall=function(t,n){n=n||function(){};if(!t.length){return n()}var r=function(t){return function(i){if(i){n.apply(null,arguments);n=function(){}}else{var s=Array.prototype.slice.call(arguments,1);var o=t.next();if(o){s.push(r(o))}else{s.push(n)}e.nextTick(function(){t.apply(null,s)})}}};r(e.iterator(t))()};var g=function(e,t,n){n=n||function(){};if(t.constructor===Array){e.map(t,function(e,t){if(e){e(function(e){var n=Array.prototype.slice.call(arguments,1);if(n.length<=1){n=n[0]}t.call(null,e,n)})}},n)}else{var r={};e.each(u(t),function(e,n){t[e](function(t){var i=Array.prototype.slice.call(arguments,1);if(i.length<=1){i=i[0]}r[e]=i;n(t)})},function(e){n(e,r)})}};e.parallel=function(t,n){g({map:e.map,each:e.each},t,n)};e.parallelLimit=function(e,t,n){g({map:p(t),each:a(t)},e,n)};e.series=function(t,n){n=n||function(){};if(t.constructor===Array){e.mapSeries(t,function(e,t){if(e){e(function(e){var n=Array.prototype.slice.call(arguments,1);if(n.length<=1){n=n[0]}t.call(null,e,n)})}},n)}else{var r={};e.eachSeries(u(t),function(e,n){t[e](function(t){var i=Array.prototype.slice.call(arguments,1);if(i.length<=1){i=i[0]}r[e]=i;n(t)})},function(e){n(e,r)})}};e.iterator=function(e){var t=function(n){var r=function(){if(e.length){e[n].apply(null,arguments)}return r.next()};r.next=function(){return n<e.length-1?t(n+1):null};return r};return t(0)};e.apply=function(e){var t=Array.prototype.slice.call(arguments,1);return function(){return e.apply(null,t.concat(Array.prototype.slice.call(arguments)))}};var y=function(e,t,n,r){var i=[];e(t,function(e,t){n(e,function(e,n){i=i.concat(n||[]);t(e)})},function(e){r(e,i)})};e.concat=f(y);e.concatSeries=c(y);e.whilst=function(t,n,r){if(t()){var i=true;n(function(s){if(s){return r(s)}if(i){e.nextTick(function(){e.whilst(t,n,r)})}else{e.whilst(t,n,r)}});i=false}else{r()}};e.doWhilst=function(t,n,r){var i=true;t(function(s){if(s){return r(s)}if(n()){if(i){e.nextTick(function(){e.doWhilst(t,n,r)})}else{e.doWhilst(t,n,r)}}else{r()}});i=false};e.until=function(t,n,r){if(!t()){var i=true;n(function(s){if(s){return r(s)}if(i){e.nextTick(function(){e.until(t,n,r)})}else{e.until(t,n,r)}});i=false}else{r()}};e.doUntil=function(t,n,r){var i=true;t(function(s){if(s){return r(s)}if(!n()){if(i){e.nextTick(function(){e.doUntil(t,n,r)})}else{e.doUntil(t,n,r)}}else{r()}});i=false};e.queue=function(t,n){function s(t,r,s,o){if(r.constructor!==Array){r=[r]}i(r,function(r){var i={data:r,callback:typeof o==="function"?o:null};if(s){t.tasks.unshift(i)}else{t.tasks.push(i)}if(t.saturated&&t.tasks.length===n){t.saturated()}e.nextTick(t.process)})}var o=0;var u={tasks:[],concurrency:n,saturated:null,empty:null,drain:null,push:function(e,t){s(u,e,false,t)},unshift:function(e,t){s(u,e,true,t)},process:function(){if(o<u.concurrency&&u.tasks.length){var n=u.tasks.shift();if(u.empty&&u.tasks.length===0){u.empty()}o+=1;var i=true;var s=function(){o-=1;if(n.callback){n.callback.apply(n,arguments)}if(u.drain&&u.tasks.length+o===0){u.drain()}u.process()};var a=r(function(){var t=arguments;if(i){e.nextTick(function(){s.apply(null,t)})}else{s.apply(null,arguments)}});t(n.data,a);i=false}},length:function(){return u.tasks.length},running:function(){return o}};return u};e.cargo=function(t,n){var r=false,o=[];var u={tasks:o,payload:n,saturated:null,empty:null,drain:null,push:function(t,r){if(t.constructor!==Array){t=[t]}i(t,function(e){o.push({data:e,callback:typeof r==="function"?r:null});if(u.saturated&&o.length===n){u.saturated()}});e.nextTick(u.process)},process:function a(){if(r)return;if(o.length===0){if(u.drain)u.drain();return}var e=typeof n==="number"?o.splice(0,n):o.splice(0);var f=s(e,function(e){return e.data});if(u.empty)u.empty();r=true;t(f,function(){r=false;var t=arguments;i(e,function(e){if(e.callback){e.callback.apply(null,t)}});a()})},length:function(){return o.length},running:function(){return r}};return u};var b=function(e){return function(t){var n=Array.prototype.slice.call(arguments,1);t.apply(null,n.concat([function(t){var n=Array.prototype.slice.call(arguments,1);if(typeof console!=="undefined"){if(t){if(console.error){console.error(t)}}else if(console[e]){i(n,function(t){console[e](t)})}}}]))}};e.log=b("log");e.dir=b("dir");e.memoize=function(e,t){var n={};var r={};t=t||function(e){return e};var i=function(){var i=Array.prototype.slice.call(arguments);var s=i.pop();var o=t.apply(null,i);if(o in n){s.apply(null,n[o])}else if(o in r){r[o].push(s)}else{r[o]=[s];e.apply(null,i.concat([function(){n[o]=arguments;var e=r[o];delete r[o];for(var t=0,i=e.length;t<i;t++){e[t].apply(null,arguments)}}]))}};i.memo=n;i.unmemoized=e;return i};e.unmemoize=function(e){return function(){return(e.unmemoized||e).apply(null,arguments)}};e.times=function(t,n,r){var i=[];for(var s=0;s<t;s++){i.push(s)}return e.map(i,n,r)};e.timesSeries=function(t,n,r){var i=[];for(var s=0;s<t;s++){i.push(s)}return e.mapSeries(i,n,r)};e.compose=function(){var t=Array.prototype.reverse.call(arguments);return function(){var n=this;var r=Array.prototype.slice.call(arguments);var i=r.pop();e.reduce(t,r,function(e,t,r){t.apply(n,e.concat([function(){var e=arguments[0];var t=Array.prototype.slice.call(arguments,1);r(e,t)}]))},function(e,t){i.apply(n,[e].concat(t))})}};if(typeof define!=="undefined"&&define.amd){define([],function(){return e})}else if(typeof module!=="undefined"&&module.exports){module.exports=e}else{t.async=e}})()
