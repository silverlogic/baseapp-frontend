import { FC } from 'react'

import { NavSectionProps } from '../../../../../types'

const MockNavItem = ({
  itemData: { title, path, icon, info, disabled, caption },
  active,
  hasChild,
  depth,
  open,
  onMouseEnter,
  onMouseLeave,
}: any) => (
  <div
    data-testid="mock-nav-item"
    data-path={path}
    data-active={active}
    data-depth={depth}
    data-open={open}
    data-disabled={disabled}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    {icon && <span data-testid="mock-icon">{icon}</span>}
    <span data-testid="mock-title">{title}</span>
    {caption && <span data-testid="mock-caption">{caption}</span>}
    {info && <span data-testid="mock-info">{info}</span>}
    {hasChild && <span data-testid="mock-chevron">chevron</span>}
  </div>
)

const MockNavList = ({ data, depth, slotProps }: any) => (
  <div data-testid="mock-nav-list" data-depth={depth}>
    <MockNavItem itemData={data} depth={depth} hasChild={!!data.children} active={false} />
    {data.children && (
      <div data-testid="mock-popover">
        {data.children.map((item: any) => (
          <MockNavList key={item.title} data={item} depth={depth + 1} slotProps={slotProps} />
        ))}
      </div>
    )}
  </div>
)

const MockNavSectionMini: FC<NavSectionProps> = ({ navData, slotProps }) => (
  <div data-testid="mock-nav-section" data-gap={slotProps?.gap ?? 4}>
    {navData.map((group) =>
      group.items.map((list) => (
        <MockNavList key={list.title} data={list} depth={1} slotProps={slotProps} />
      )),
    )}
  </div>
)

export const NavSectionMiniForTesting: FC<Partial<NavSectionProps>> = (props) => {
  const defaultProps: NavSectionProps = {
    navData: [
      {
        subheader: 'Test Group',
        items: [
          {
            title: 'Test Item',
            path: '/test',
            icon: <div>test-icon</div>,
            children: [
              {
                title: 'Child Item',
                path: '/test/child',
              },
            ],
          },
        ],
      },
    ],
    ...props,
  }

  return <MockNavSectionMini {...defaultProps} />
}
