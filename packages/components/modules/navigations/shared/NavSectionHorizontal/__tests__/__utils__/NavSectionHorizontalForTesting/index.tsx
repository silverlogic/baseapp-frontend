import { FC } from 'react'

import { NavSectionHorizontalProps } from '../../../types'

const MockNavItem = ({
  itemData: { title, path, icon, info, disabled, caption },
  active,
  hasChild,
  depth,
  hasTabLayout,
  onClick,
}: any) => (
  <div
    data-testid="mock-nav-item"
    data-path={path}
    data-active={active}
    data-depth={depth}
    data-tab-layout={hasTabLayout}
    data-disabled={disabled}
    onClick={onClick}
  >
    {icon && <span data-testid="mock-icon">{icon}</span>}
    <span data-testid="mock-title">{title}</span>
    {caption && <span data-testid="mock-caption">{caption}</span>}
    {info && <span data-testid="mock-info">{info}</span>}
    {hasChild && <span data-testid="mock-chevron">chevron</span>}
  </div>
)

const MockNavList = ({ data, depth, slotProps, hasTabLayout }: any) => (
  <div data-testid="mock-nav-list" data-depth={depth} data-tab-layout={hasTabLayout}>
    <MockNavItem
      itemData={data}
      depth={depth}
      hasChild={!!data.children}
      active={data.active}
      hasTabLayout={hasTabLayout}
    />
  </div>
)

const MockNavSectionHorizontal: FC<NavSectionHorizontalProps> = ({
  navData,
  slotProps,
  hasTabLayout,
}) => (
  <div data-testid="mock-nav-section" data-tab-layout={hasTabLayout}>
    <div data-testid="mock-nav-container">
      {navData.map((group) =>
        group.items.map((list) => (
          <MockNavList
            key={list.title}
            data={list}
            depth={1}
            slotProps={slotProps}
            hasTabLayout={hasTabLayout}
          />
        )),
      )}
    </div>
  </div>
)

export const NavSectionHorizontalForTesting: FC<Partial<NavSectionHorizontalProps>> = (props) => {
  const defaultProps: NavSectionHorizontalProps = {
    navData: [
      {
        subheader: 'Test Group',
        items: [
          {
            title: 'Test Item 1',
            path: '/test1',
            icon: <div>icon1</div>,
          },
          {
            title: 'Test Item 2',
            path: '/test2',
            icon: <div>icon2</div>,
            active: true,
          },
        ],
      },
    ],
    hasTabLayout: false,
    ...props,
  }

  return <MockNavSectionHorizontal {...defaultProps} />
}
