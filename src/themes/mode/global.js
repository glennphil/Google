import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    --background-color: ${({ theme }) => theme.backgroundcolor};
    --logo: ${({ theme }) => theme.logo};
    --notfound-logo: ${({ theme }) => theme.notfoundlogo};
    --robot: ${({ theme }) => theme.robot};
    --scrollbar-color: ${({ theme }) => theme.scrollbarcolor};
    --scrollbar-thumb: ${({ theme }) => theme.scrollbarthumb};
    --scrollbar-thumb-hover: ${({ theme }) => theme.scrollbarthumbhover};
    --gapp-background-color: ${({ theme }) => theme.gappbackgroundcolor};
    --footer-background-color: ${({ theme }) => theme.footerbackground};
    --searchbar-hover: ${({ theme }) => theme.searchbarhover};
    --searchbar-border-hover: ${({ theme }) => theme.searchbarborderhover};
    --searchbar-shadow-hover: ${({ theme }) => theme.searchbarshadowhover};
    --search-button-hover: ${({ theme }) => theme.searchbuttonhover};
    --search-button-color: ${({ theme }) => theme.searchbuttoncolor};
    --searchbar-icon: ${({ theme }) => theme.searchbaricon};
    --searchbar-icon-2: ${({ theme }) => theme.searchbaricon2};
    --text-color-1: ${({ theme }) => theme.textcolor1};
    --text-color-2: ${({ theme }) => theme.textcolor2};
    --text-color-3: ${({ theme }) => theme.textcolor3};
    --text-color-4: ${({ theme }) => theme.textcolor4};
    --text-color-5: ${({ theme }) => theme.textcolor5};
    --text-color-6: ${({ theme }) => theme.textcolor6};
    --text-color-7: ${({ theme }) => theme.textcolor7};
    --border-color-1: ${({ theme }) => theme.bordercolor1};
    --border-color-2: ${({ theme }) => theme.bordercolor2};
    --border-color-3: ${({ theme }) => theme.bordercolor3};
    --border-color-4: ${({ theme }) => theme.bordercolor4};
    --button-hover: ${({ theme }) => theme.buttonhover};
    --button-active: ${({ theme }) => theme.buttonactive};
    --gapp-icon-fill: ${({ theme }) => theme.gappsfill};
    --gapp-icon-hover: ${({ theme }) => theme.gappiconhover};
    --gapp-icon-active: ${({ theme }) => theme.gappiconactive};
    --gapp-title-background: ${({ theme }) => theme.gapptitlebackground};
    --gapp-app-hover: ${({ theme }) => theme.gappapphover};
    --gapp-shadow: ${({ theme }) => theme.gappshadow};
    --tooltip-background-color: ${({ theme }) => theme.tooltipbackground};
    --tooltip-text-color: ${({ theme }) => theme.tooltiptextcolor};
    --tooltip-border-color: ${({ theme }) => theme.tooltipborder};
    --userpanel-button-border-color: ${({ theme }) => theme.userpanelbuttonborder};
    --userpanel-text-color: ${({ theme }) => theme.userpaneltext};
    --userpanel-email-text-color: ${({ theme }) => theme.userpanelemail};
    --userpanel-button-hover: ${({ theme }) => theme.userpanelbuttonhover};
    --userpanel-button-active: ${({ theme }) => theme.userpanelbuttonactive};
  }
`;
