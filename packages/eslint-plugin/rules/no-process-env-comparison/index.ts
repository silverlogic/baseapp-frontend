import { Rule } from 'eslint'

const noProcessEnvComparisonRule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Disallow comparisons with process.env variables starting with NEXT_PUBLIC_ directly without using trim().',
      category: 'Best Practices',
      recommended: false,
    },
    messages: {
      avoidDirectEnvComparison:
        'Avoid comparing `process.env.NEXT_PUBLIC_*` variables directly to any value. It can lead to unexpected behavior, since the variable may contain whitespaces or invisible characters. Use `process.env?.NEXT_PUBLIC_ENV?.trim()` instead.',
    },
    schema: [],
  },
  create(context: Rule.RuleContext) {
    return {
      BinaryExpression(node: any) {
        const leftSide = node.left

        if (
          leftSide.type === 'MemberExpression' &&
          leftSide.object.type === 'MemberExpression' &&
          leftSide.object.object.name === 'process' &&
          leftSide.object.property.name === 'env' &&
          leftSide.property.name.startsWith('NEXT_PUBLIC_')
        ) {
          const isUsingTrim =
            leftSide.parent.type === 'CallExpression' &&
            leftSide.parent.callee.type === 'MemberExpression' &&
            leftSide.parent.callee.property.name === 'trim'

          if (!isUsingTrim) {
            context.report({
              node,
              messageId: 'avoidDirectEnvComparison',
            })
          }
        }
      },
    }
  },
}

export default noProcessEnvComparisonRule
