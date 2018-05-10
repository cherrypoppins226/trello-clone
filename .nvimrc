autocmd BufNewFile,BufRead .eslintrc set filetype=json

function! s:goto_import()
    " Just a dummy call to be able to set the mark with the column saved.
    " :mark only saves the line number
    call search('.', 's')
    call cursor(line('$'), 1)
    let l:line = search('^import', 'bcW')
    let l:line = l:line == 0 ? 1 : l:line
    call cursor(l:line, 1)
endf

function! s:settings()
    nnoremap <silent> <buffer> <leader>li :call <SID>goto_import()<CR>
    if !exists('g:did_plugin_ultisnips')
        packadd ultisnips
    endif
    UltiSnipsAddFiletypes javascript-jasmine-arrow
    UltiSnipsAddFiletypes javascript-jsdoc
    UltiSnipsAddFiletypes javascript-node
    UltiSnipsAddFiletypes javascript-es6-react
    UltiSnipsAddFiletypes javascript-react
endfunction

autocmd! FileType javascript,javascript.jsx,typescript,typescript.jsx call <SID>settings()

Cabbrev ue[dit] UltiSnipsEdit!
