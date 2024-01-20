from tree_sitter import Language, Parser

Language.build_library(
    'java_js.so',
    [
        'tree-sitter-java',
        'tree-sitter-javascript'
    ]
)