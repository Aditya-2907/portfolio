(function () {
            var root = document.documentElement;
var toggle = document.getElementById('themeToggle');
var stored = localStorage.getItem('theme');
if (stored) {root.setAttribute('data-theme', stored); }
else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    root.setAttribute('data-theme', 'light');
            }
toggle.addEventListener('click', function () {
                var current = root.getAttribute('data-theme');
var next = current === 'dark' ? 'light' : 'dark';
root.setAttribute('data-theme', next);
localStorage.setItem('theme', next);
            });

var burger = document.getElementById('navBurger');
var navLinks = document.getElementById('navLinks');
burger.addEventListener('click', function () {
    navLinks.classList.toggle('open');
            });
navLinks.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { navLinks.classList.remove('open'); });
            });

var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

var revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !reduced) {
                var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
        }
    });
                }, {threshold: 0.15 });
revealEls.forEach(function (el) {io.observe(el); });
            } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
            }

var lines = [
['{', null],
['  "name"', '"Aditya Paul"'],
    ['  "role"', '"Full Stack Web Developer"'],
    ['  "based_in"', '"Kolkata, India"'],
    ['  "teaches_at"', '"Technosoft Academy"'],
    ['  "stack"', '["JavaScript", "Node.js", "Express", "MongoDB", "MySQL"]'],
    ['  "status"', '"open_to_work"'],
    ['}', null]
            ];
var target = document.getElementById('apiTyped');

function renderStatic() {
                var html = '';
lines.forEach(function (pair) {
                    if (pair[1] === null) {html += pair[0] + '\n'; }
else {html += '<span class="k">' + pair[0] + '</span>: <span class="s">' + pair[1] + '</span>,\n'; }
                });
target.innerHTML = html;
            }

if (reduced) {
    renderStatic();
            } else {
                var flatLines = lines.map(function (pair) {
                    return pair[1] === null ? pair[0] : pair[0] + ': ' + pair[1] + ',';
                });
var li = 0, ci = 0;
function typeNext() {
                    if (li >= flatLines.length) { return; }
var line = flatLines[li];
                    if (ci === 0 && li > 0) {target.appendChild(document.createTextNode('\n')); }
if (ci < line.length) {
    target.appendChild(document.createTextNode(line[ci]));
ci++;
setTimeout(typeNext, 12 + Math.random() * 18);
                    } else {
    li++; ci = 0;
setTimeout(typeNext, 90);
                    }
                }
setTimeout(typeNext, 500);
            }
        })();
